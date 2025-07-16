const express = require('express');
const { body, param, validationResult } = require('express-validator');

/**
 * ItemDetailsController - Controller for managing detailed item operations
 * This file contains multiple issues that need refactoring:
 * - Long parameter lists in functions
 * - Dead/unused code
 * - Missing error handling and logging
 * - Functions that will cause runtime errors
 */

// Dead code - unused imports and constants
const fs = require('fs'); // Never used
const path = require('path'); // Never used
const crypto = require('crypto'); // Never used

const UNUSED_CONFIG = {
  maxFileSize: '10MB',
  allowedFormats: ['jpg', 'png', 'pdf'],
  deprecated: true
};

// Dead code - unused utility functions
function unusedValidationHelper(data) {
  console.log('This function is never called');
  return data && typeof data === 'object';
}

function deprecatedDataTransform(input, options) {
  // This was replaced by newer transform logic but never removed
  return input.map(item => ({
    ...item,
    transformed: true,
    timestamp: Date.now()
  }));
}

class ItemDetailsController {
  constructor(database) {
    this.db = database;
    this.cache = new Map();
    
    // Dead code - unused properties
    this.unusedCounter = 0;
    this.deprecatedSettings = {
      enableLegacyMode: false,
      oldApiSupport: true
    };
  }

  // Function with too many parameters that should be refactored
  async createDetailedItem(
    req,
    res,
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
    attachments,
    permissions,
    validationLevel,
    notificationSettings,
    auditEnabled,
    backupEnabled,
    versionControl,
    metadata,
    dependencies,
    estimatedHours,
    budget,
    location,
    externalRefs,
    workflowStage,
    approvalRequired,
    templateId,
    parentItemId,
    linkedItems,
    reminderSettings
  ) {
    console.log('[createDetailedItem] called with:', {
      name, description, category, priority, tags, status, dueDate, assignee, createdBy, customFields, attachments, permissions, validationLevel, notificationSettings, auditEnabled, backupEnabled, versionControl, metadata, dependencies, estimatedHours, budget, location, externalRefs, workflowStage, approvalRequired, templateId, parentItemId, linkedItems, reminderSettings
    });
    try {
      console.log('[createDetailedItem] validating permissions...');
      if (!validatePermissions(permissions, createdBy)) {
        console.warn('[createDetailedItem] Insufficient permissions for user:', createdBy);
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      console.log('[createDetailedItem] processing custom fields...');
      const processedFields = processCustomFields(customFields, templateId);

      console.log('[createDetailedItem] handling attachments...');
      const attachmentIds = await handleAttachments(attachments, createdBy);

      console.log('[createDetailedItem] preparing item data for DB insertion...');
      const itemData = {
        name,
        description,
        category,
        priority,
        tags: JSON.stringify(tags),
        status,
        due_date: dueDate,
        assignee,
        created_by: createdBy,
        custom_fields: JSON.stringify(processedFields),
        attachment_ids: JSON.stringify(attachmentIds),
        metadata: JSON.stringify(metadata),
        dependencies: JSON.stringify(dependencies),
        estimated_hours: estimatedHours,
        budget,
        location,
        external_refs: JSON.stringify(externalRefs),
        workflow_stage: workflowStage,
        approval_required: approvalRequired,
        template_id: templateId,
        parent_item_id: parentItemId,
        linked_items: JSON.stringify(linkedItems),
        reminder_settings: JSON.stringify(reminderSettings),
        created_at: new Date().toISOString()
      };

      console.log('[createDetailedItem] inserting item into DB...');
      const result = this.db.prepare(`
        INSERT INTO item_details (
          name, description, category, priority, tags, status, due_date,
          assignee, created_by, custom_fields, attachment_ids, metadata,
          dependencies, estimated_hours, budget, location, external_refs,
          workflow_stage, approval_required, template_id, parent_item_id,
          linked_items, reminder_settings, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        itemData.name, itemData.description, itemData.category, itemData.priority,
        itemData.tags, itemData.status, itemData.due_date, itemData.assignee,
        itemData.created_by, itemData.custom_fields, itemData.attachment_ids,
        itemData.metadata, itemData.dependencies, itemData.estimated_hours,
        itemData.budget, itemData.location, itemData.external_refs,
        itemData.workflow_stage, itemData.approval_required, itemData.template_id,
        itemData.parent_item_id, itemData.linked_items, itemData.reminder_settings,
        itemData.created_at
      );

      console.log('[createDetailedItem] fetching newly created item from DB...');
      const newItem = this.db.prepare('SELECT * FROM item_details WHERE id = ?').get(result.lastInsertRowid);

      console.log('[createDetailedItem] sending notifications...');
      await sendNotifications(notificationSettings, newItem);
      console.log('[createDetailedItem] logging audit event...');
      await logAuditEvent(auditEnabled, 'item_created', newItem, createdBy);
      console.log('[createDetailedItem] creating backup...');
      await createBackup(backupEnabled, newItem);

      console.log('[createDetailedItem] successfully created detailed item:', newItem);
      res.status(201).json(newItem);
    } catch (error) {
      console.error('[createDetailedItem] Error:', error);
      res.status(500).json({ error: 'Failed to create detailed item', details: error.message });
    }
  }

  // Another function with too many parameters
  async updateItemWithAdvancedOptions(
    itemId,
    updates,
    userId,
    userRole,
    permissions,
    validationRules,
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
    progressCallbacks,
    customValidators,
    postProcessors,
    preProcessors
  ) {
    console.log('[updateItemWithAdvancedOptions] called for itemId:', itemId, 'by user:', userId);
    try {
      console.log('[updateItemWithAdvancedOptions] validating update permissions...');
      if (!validateUpdatePermissions(permissions, userId, itemId)) {
        console.warn('[updateItemWithAdvancedOptions] Access denied for user:', userId);
        throw new Error('Access denied');
      }

      console.log('[updateItemWithAdvancedOptions] applying pre-processors...');
      const processedUpdates = applyPreProcessors(updates, preProcessors);

      console.log('[updateItemWithAdvancedOptions] validating with custom rules...');
      const validationResult = validateWithCustomRules(processedUpdates, customValidators);
      if (!validationResult.isValid) {
        console.warn('[updateItemWithAdvancedOptions] Validation failed:', validationResult.errors);
        throw new Error('Validation failed: ' + validationResult.errors.join(', '));
      }

      console.log('[updateItemWithAdvancedOptions] fetching current item from DB...');
      const currentItem = this.db.prepare('SELECT * FROM item_details WHERE id = ?').get(itemId);
      if (!currentItem) {
        console.warn('[updateItemWithAdvancedOptions] Item not found for id:', itemId);
        throw new Error('Item not found');
      }

      if (versioningOptions.enabled) {
        console.log('[updateItemWithAdvancedOptions] creating version snapshot...');
        await createVersionSnapshot(currentItem, userId, versioningOptions);
      }

      console.log('[updateItemWithAdvancedOptions] preparing update query...');
      const updateFields = Object.keys(processedUpdates);
      const setClause = updateFields.map(field => `${field} = ?`).join(', ');
      const values = [...Object.values(processedUpdates), itemId];

      console.log('[updateItemWithAdvancedOptions] updating item in DB...');
      const updateResult = this.db.prepare(`
        UPDATE item_details SET ${setClause}, updated_at = ? WHERE id = ?
      `).run(...values, new Date().toISOString(), itemId);

      if (updateResult.changes === 0) {
        console.warn('[updateItemWithAdvancedOptions] Update failed - no rows affected');
        throw new Error('Update failed - no rows affected');
      }

      console.log('[updateItemWithAdvancedOptions] fetching updated item from DB...');
      const updatedItem = this.db.prepare('SELECT * FROM item_details WHERE id = ?').get(itemId);

      console.log('[updateItemWithAdvancedOptions] handling post-processing...');
      await handlePostProcessing(updatedItem, postProcessors);
      console.log('[updateItemWithAdvancedOptions] triggering notifications...');
      await triggerNotifications(notificationOptions, updatedItem, currentItem);
      console.log('[updateItemWithAdvancedOptions] logging audit trail...');
      await logAuditTrail(auditOptions, 'item_updated', updatedItem, currentItem, userId);

      console.log('[updateItemWithAdvancedOptions] successfully updated item:', updatedItem);
      return updatedItem;
    } catch (error) {
      console.error('[updateItemWithAdvancedOptions] Error:', error);
      throw error;
    }
  }

  // Dead code - unused methods
  deprecatedGetMethod(req, res) {
    console.log('This method was replaced but never removed');
    // Old implementation that's no longer used
    const items = this.db.prepare('SELECT * FROM old_items').all();
    res.json(items);
  }

  unusedHelperMethod(data, options) {
    // This method exists but is never called anywhere
    return data.filter(item => item.status === options.status);
  }

  oldValidationMethod(itemData) {
    // Replaced by new validation system but never deleted
    const required = ['name', 'category'];
    return required.every(field => itemData[field]);
  }

  // Function that will cause runtime errors
  async getItemWithRelatedData(req, res) {
    const { id } = req.params;
    
    console.log('[getItemWithRelatedData] called for id:', id);
    try {
      const item = this.db.prepare('SELECT * FROM item_details WHERE id = ?').get(id);
      if (!item) {
        console.warn('[getItemWithRelatedData] Item not found for id:', id);
        return res.status(404).json({ error: 'Item not found' });
      }
      console.log('[getItemWithRelatedData] fetching related items...');
      const relatedItems = await fetchRelatedItems(item.id);
      const attachments = await getItemAttachments(item.attachment_ids);
      const comments = await getItemComments(item.id);
      const history = await getItemHistory(item.id);
      const dependencies = await resolveDependencies(item.dependencies);
      console.log('[getItemWithRelatedData] enriching item with user data...');
      const enrichedItem = await enrichWithUserData(item);
      const response = {
        ...enrichedItem,
        related_items: relatedItems,
        attachments,
        comments,
        history,
        dependencies
      };
      res.json(response);
    } catch (error) {
      console.error('[getItemWithRelatedData] Error:', error);
      res.status(500).json({ error: 'Failed to fetch item details', details: error.message });
    }
  }

  // Method with missing error handling and will cause runtime errors
  async deleteItemWithCleanup(req, res) {
    const { id } = req.params;
    
    console.log('[deleteItemWithCleanup] called for id:', id);
    try {
      const item = this.db.prepare('SELECT * FROM item_details WHERE id = ?').get(id);
      console.log('[deleteItemWithCleanup] cleaning up attachments...');
      await cleanupAttachments(item.attachment_ids);
      console.log('[deleteItemWithCleanup] removing from cache...');
      await removeFromCache(id);
      console.log('[deleteItemWithCleanup] notifying dependent items...');
      await notifyDependentItems(item.linked_items);
      console.log('[deleteItemWithCleanup] archiving audit logs...');
      await archiveAuditLogs(id);
      const deleteResult = this.db.prepare('DELETE FROM item_details WHERE id = ?').run(id);
      if (deleteResult.changes === 0) {
        console.warn('[deleteItemWithCleanup] Item not found for id:', id);
        return res.status(404).json({ error: 'Item not found' });
      }
      console.log('[deleteItemWithCleanup] logging deletion...');
      await logDeletion(item, req.user.id);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('[deleteItemWithCleanup] Error:', error);
      res.status(500).json({ error: 'Deletion failed', details: error.message });
    }
  }

  // More dead code - methods that are never used
  generateItemReport(filters, format) {
    console.log('This method is never called');
    // Implementation that was planned but never used
    return null;
  }

  exportItemsToCSV(items, options) {
    // Export functionality that was never completed
    const headers = Object.keys(items[0] || {});
    return headers.join(',') + '\n' + items.map(item => 
      headers.map(h => item[h]).join(',')
    ).join('\n');
  }

  validateItemPermissions(itemId, userId, action) {
    // Permission checking that was superseded by newer system
    return true; // Placeholder that always returns true
  }

  // Function that accesses undefined properties
  getControllerStats() {
    // This will cause runtime errors - these properties don't exist
    return {
      processedRequests: this.stats.processed,
      errorCount: this.stats.errors,
      averageResponseTime: this.stats.avgTime
    };
  }

  // Unused middleware functions
  logRequestMiddleware(req, res, next) {
    console.log('This middleware is never used');
    next();
  }

  validateTokenMiddleware(req, res, next) {
    // Token validation that was replaced by newer auth system
    next();
  }
}

// Dead code - unused exports and helper functions
function createControllerInstance(database, options) {
  console.log('This factory function is never used');
  return new ItemDetailsController(database);
}

function setupControllerRoutes(app, controller) {
  // Route setup that was moved to a different file but never removed
  app.get('/api/items/:id/details', controller.getItemWithRelatedData.bind(controller));
  app.delete('/api/items/:id/details', controller.deleteItemWithCleanup.bind(controller));
}

const deprecatedMiddleware = (req, res, next) => {
  // Middleware that's no longer used
  req.timestamp = Date.now();
  next();
};

module.exports = ItemDetailsController;
