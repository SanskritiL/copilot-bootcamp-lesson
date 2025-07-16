/**
 * ItemService - Service for managing item operations
 * Handles item creation, updates, deletion and filtering with proper validation
 */

const API_BASE_URL = '/api';

// Utility functions for validation and data processing
function validateItemData(itemData) {
  console.log('[validateItemData] Validating item data');
  const requiredFields = ['name', 'category', 'status'];
  const isValid = requiredFields.every(field => {
    const hasField = itemData[field] !== undefined && itemData[field] !== null;
    if (!hasField) {
      console.warn(`[validateItemData] Missing required field: ${field}`);
    }
    return hasField;
  });
  console.log('[validateItemData] Validation result:', isValid);
  return isValid;
}

function validateUserPermissions(permissions, itemId) {
  console.log('[validateUserPermissions] Checking permissions for item:', itemId);
  if (!permissions || !Array.isArray(permissions)) {
    console.warn('[validateUserPermissions] Invalid permissions format');
    return false;
  }
  const hasRequiredPermissions = permissions.includes('write') || permissions.includes('admin');
  console.log('[validateUserPermissions] Has required permissions:', hasRequiredPermissions);
  return hasRequiredPermissions;
}

function prepareUpdateData(updates, validationRules = {}) {
  console.log('[prepareUpdateData] Preparing update data');
  const preparedData = { ...updates };
  
  // Apply validation rules if provided
  if (Object.keys(validationRules).length > 0) {
    Object.entries(validationRules).forEach(([field, rule]) => {
      if (preparedData[field] !== undefined) {
        switch (rule.type) {
          case 'string':
            preparedData[field] = String(preparedData[field]);
            break;
          case 'number':
            preparedData[field] = Number(preparedData[field]);
            break;
          case 'boolean':
            preparedData[field] = Boolean(preparedData[field]);
            break;
          case 'date':
            preparedData[field] = new Date(preparedData[field]).toISOString();
            break;
          default:
            console.warn(`[prepareUpdateData] Unknown validation rule type: ${rule.type}`);
            break;
        }
      }
    });
  }

  console.log('[prepareUpdateData] Prepared data:', preparedData);
  return preparedData;
}

function buildAdvancedQuery(filters, sorting, pagination, includes, excludes, searchTerm, dateRange) {
  console.log('[buildAdvancedQuery] Building query parameters');
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(`filter[${key}]`, value);
    });
  }

  if (sorting) {
    params.append('sort', `${sorting.direction === 'desc' ? '-' : ''}${sorting.field}`);
  }

  if (pagination) {
    params.append('page[size]', pagination.pageSize);
    params.append('page[number]', pagination.pageNumber);
  }

  if (includes?.length) {
    params.append('include', includes.join(','));
  }

  if (excludes?.length) {
    params.append('exclude', excludes.join(','));
  }

  if (searchTerm) {
    params.append('search', searchTerm);
  }

  if (dateRange) {
    if (dateRange.start) params.append('dateFrom', dateRange.start);
    if (dateRange.end) params.append('dateTo', dateRange.end);
  }

  console.log('[buildAdvancedQuery] Built query string:', params.toString());
  return params.toString();
}

function checkCacheFirst(url, cacheOptions = {}) {
  console.log('[checkCacheFirst] Checking cache for URL:', url);
  const cacheKey = `item-cache:${url}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const maxAge = cacheOptions.maxAge || 5 * 60 * 1000; // 5 minutes default
    const isExpired = Date.now() - timestamp > maxAge;
    
    if (!isExpired) {
      console.log('[checkCacheFirst] Cache hit');
      return data;
    } else {
      console.log('[checkCacheFirst] Cache expired, removing');
      localStorage.removeItem(cacheKey);
    }
  }
  
  console.log('[checkCacheFirst] Cache miss');
  return null;
}

class ItemService {
  constructor() {
    this.cache = new Map();
    this.lastFetch = null;
    
    // Dead code - unused properties
    this.unusedProperty = 'never accessed';
    this.deprecatedConfig = {
      timeout: 5000,
      retries: 3
    };
  }

  // Function with too many parameters that should be refactored to use an options object
  async createItemWithDetails(
    name,
    description,
    category,
    priority,
    tags,
    status,
    dueDate,
    assignee,
    createdBy,
    customFields,
    permissions,
    validationLevel,
    notificationSettings,
    auditEnabled,
    backupEnabled,
    versionControl,
    metadata,
    attachments,
    dependencies,
    estimatedHours,
    actualHours,
    budget,
    currency,
    location,
    externalReferences
  ) {
    console.log('[createItemWithDetails] called with:', {
      name, description, category, priority, tags, status, dueDate, assignee, createdBy, customFields, permissions, validationLevel, notificationSettings, auditEnabled, backupEnabled, versionControl, metadata, attachments, dependencies, estimatedHours, actualHours, budget, currency, location, externalReferences
    });
    try {
      // Missing input validation
      const itemData = {
        name,
        description,
        category,
        priority,
        tags,
        status,
        dueDate,
        assignee,
        createdBy,
        customFields,
        permissions,
        validationLevel,
        notificationSettings,
        auditEnabled,
        backupEnabled,
        versionControl,
        metadata,
        attachments,
        dependencies,
        estimatedHours,
        actualHours,
        budget,
        currency,
        location,
        externalReferences
      };

      // This will cause a runtime error - validateItemData function doesn't exist
      if (!validateItemData(itemData)) {
        throw new Error('Invalid item data');
      }

      console.log('[createItemWithDetails] Sending request to API...');
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        console.error('[createItemWithDetails] API request failed with status:', response.status);
        throw new Error('Failed to create item');
      }

      const result = await response.json();
      console.log('[createItemWithDetails] Item created successfully:', result);
      return result;
    } catch (error) {
      console.error('[createItemWithDetails] Error:', error);
      throw error;
    }
  }

  // Another function with too many parameters
  async updateItemWithValidation(
    itemId,
    updates,
    validationRules,
    userPermissions,
    auditOptions,
    notificationOptions,
    backupOptions,
    versioningOptions,
    conflictResolution,
    retryPolicy,
    timeoutSettings,
    cachingStrategy,
    loggingLevel,
    performanceTracking,
    securityContext,
    transactionOptions,
    rollbackStrategy,
    successCallbacks,
    errorCallbacks,
    progressCallbacks
  ) {
    console.log('[updateItemWithValidation] called for itemId:', itemId, 'with updates:', updates);
    try {
      // Missing validation of inputs
      
      // This will cause a runtime error - validateUserPermissions doesn't exist
      if (!validateUserPermissions(userPermissions, itemId)) {
        throw new Error('Insufficient permissions');
      }

      // This will cause a runtime error - prepareUpdateData doesn't exist  
      const preparedData = prepareUpdateData(updates, validationRules);

      console.log('[updateItemWithValidation] Sending update request to API...');
      const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        console.error('[updateItemWithValidation] API request failed with status:', response.status);
        throw new Error('Update failed');
      }

      const result = await response.json();
      console.log('[updateItemWithValidation] Item updated successfully:', result);
      return result;
    } catch (error) {
      console.error('[updateItemWithValidation] Error:', error);
      throw error;
    }
  }

  // Dead code - unused methods
  deprecatedFetchMethod(id) {
    console.log('This method was replaced but never removed');
    return fetch(`/api/old/items/${id}`);
  }

  unusedHelperMethod(data, transform) {
    // This method exists but is never called
    return data.map(transform).filter(Boolean);
  }

  oldCacheMethod(key, value) {
    // Replaced by new caching system but never deleted
    localStorage.setItem(`old_cache_${key}`, JSON.stringify(value));
  }

  // Function that will cause runtime errors
  async fetchItemsWithAdvancedFiltering(
    filters,
    sorting,
    pagination,
    includes,
    excludes,
    searchTerm,
    dateRange,
    userContext,
    permissions,
    cacheOptions
  ) {
    console.log('[fetchItemsWithAdvancedFiltering] called with filters:', filters);
    try {
      // This will cause an error - buildAdvancedQuery doesn't exist
      const queryParams = buildAdvancedQuery(
        filters,
        sorting,
        pagination,
        includes,
        excludes,
        searchTerm,
        dateRange
      );

      const url = `${API_BASE_URL}/items?${queryParams}`;
      
      // This will cause an error - checkCacheFirst doesn't exist
      const cachedResult = checkCacheFirst(url, cacheOptions);
      if (cachedResult) {
        return cachedResult;
      }

      console.log('[fetchItemsWithAdvancedFiltering] Sending fetch request to API...');
      const response = await fetch(url);

      if (!response.ok) {
        console.error('[fetchItemsWithAdvancedFiltering] API request failed with status:', response.status);
        throw new Error('Fetch failed');
      }

      const data = await response.json();
      console.log('[fetchItemsWithAdvancedFiltering] Data fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('[fetchItemsWithAdvancedFiltering] Error:', error);
      throw error;
    }
  }

  // Method with missing error handling
  async deleteItem(itemId) {
    console.log('[deleteItem] called for itemId:', itemId);
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('[deleteItem] API request failed with status:', response.status);
        throw new Error('Failed to delete item');
      }

      const result = await response.json();
      console.log('[deleteItem] Item deleted successfully:', result);
      return result;
    } catch (error) {
      console.error('[deleteItem] Error:', error);
      throw error;
    }
  }

}

export default ItemService;
