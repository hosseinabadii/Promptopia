import { handleDeletePrompt } from "@/actions/prompt-actions";

export default function ConfirmDeleteModal({ promptId, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold">Confirm Delete</h2>
        <p className="text-gray-600 my-4">
          Are you sure you want to delete this prompt?
        </p>
        <div className="mt-8 flex justify-end space-x-2">
          <button
            className="px-4 py-2 font-semibold text-gray-600 rounded hover:bg-gray-400 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 font-semibold text-red-500 rounded hover:bg-red-600 hover:text-white"
            onClick={() => handleDeletePrompt(promptId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
