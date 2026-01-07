import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { AdminButton } from './AdminButton';
import { motion, AnimatePresence } from 'framer-motion';

export function ArrayEditor({
  items = [],
  onChange,
  renderItem,
  onAdd,
  onRemove,
  title,
  emptyMessage = 'No items yet. Add one to get started.',
}) {
  const handleAdd = () => {
    const newItem = onAdd();
    onChange([...items, newItem]);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    if (onRemove) onRemove(index);
  };

  const handleItemChange = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <AdminButton onClick={handleAdd} icon={Plus} variant="secondary">
            Add Item
          </AdminButton>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-8 text-white/50 text-sm">{emptyMessage}</div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="pt-2 text-white/30 cursor-grab">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    {renderItem(item, (updatedItem) => handleItemChange(index, updatedItem), index)}
                  </div>
                  <AdminButton
                    onClick={() => handleRemove(index)}
                    variant="danger"
                    icon={Trash2}
                    className="flex-shrink-0"
                  >
                    Remove
                  </AdminButton>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!title && items.length > 0 && (
        <AdminButton onClick={handleAdd} icon={Plus} variant="secondary" className="w-full">
          Add Item
        </AdminButton>
      )}
    </div>
  );
}

