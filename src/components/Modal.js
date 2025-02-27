import React, { useState } from "react";
import NewFiscalYear from "./NewFiscalYear";
import UpdateFiscalYear from "./UpdateFiscalYear";

const Modal = ({ isUpdate, isOpen, closeModal, data }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-h-full overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
        {!isConfirmed ? (
          !isUpdate ? (
            <>
              <p className="text-lg text-center mb-4">
                Are you sure you want to start a new fiscal year?
              </p>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                  onClick={() => {
                    setIsConfirmed(true);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <UpdateFiscalYear closeModal={closeModal} data={data} />
          )
        ) : (
          <NewFiscalYear
            closeModal={closeModal}
            setIsConfirmed={setIsConfirmed}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
