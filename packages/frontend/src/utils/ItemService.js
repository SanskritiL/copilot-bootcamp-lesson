/**
 * ItemService - Service for managing item operations
 * This file contains multiple issues that need refactoring:
 * - Long parameter lists in functions
 * - Dead/unused code
 * - Missing error handling and logging
 * - Functions that will cause runtime errors
 */

const API_BASE_URL = '/api';

// Dead code - unused constants
const UNUSED_CONSTANT = 'This is never used anywhere';
const OLD_API_VERSION = 'v1'; // Not used anymore
const DEPRECATED_ENDPOINTS = {
  old_items: '/api/v1/items',
  old_users: '/api/v1/users'
};

// Unused utility functions (dead code)
function unusedUtilityFunction(data) {
  console.log('This function is never called');
  return data.map(item => item.id);
}

function deprecatedDataProcessor(items, filters, sorts, pagination) {
  // This function was replaced but never removed
  const processed = items.filter(filters).sort(sorts);
  return processed.slice(pagination.start, pagination.end);
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

  // Dead code - method that's never called
  generateReportData(items, reportType, filters) {
    console.log('This method is never used');
    
    if (reportType === 'summary') {
      return this.generateSummaryReport(items, filters);
    } else if (reportType === 'detailed') {
      return this.generateDetailedReport(items, filters);
    }
    
    return null;
  }

  // More dead code
  exportToFormat(data, format, options) {
    // This export functionality was never implemented fully
    switch (format) {
      case 'csv':
        return this.exportToCSV(data, options);
      case 'json':
        return this.exportToJSON(data, options);
      case 'xml':
        return this.exportToXML(data, options);
      default:
        return null;
    }
  }

  // Unused private methods
  _oldValidation(data) {
    // Old validation logic that's no longer used
    return data && typeof data === 'object';
  }

  _deprecatedFormatter(value, type) {
    // Formatting logic that was replaced
    if (type === 'date') {
      return new Date(value).toISOString();
    }
    return String(value);
  }
}

// Dead code - unused exports and variables
const unusedServiceInstance = new ItemService();
const deprecatedConfig = {
  apiVersion: 'v1',
  timeout: 30000
};

// Function that's never used
function createLegacyService(config) {
  return new ItemService(config);
}

export default ItemService;
