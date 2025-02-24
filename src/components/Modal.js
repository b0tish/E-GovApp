import React, {useState} from "react";
import NewFiscalYear from "./NewFiscalYear";

const Modal = ({ isOpen, closeModal,data }) => {
  const [isConfirmed,setIsConfirmed]= useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 pt-24">
      <div className="bg-white p-6 rounded-lg shadow-lg max-h-full overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Start New Fiscal Year</h2>
        {!isConfirmed ? (
          <>
            <p>Are you sure you want to start a new fiscal year?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  setIsConfirmed(true);
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <NewFiscalYear closeModal={closeModal} setIsConfirmed={setIsConfirmed} data={data}/>
        )}
      </div>
    </div>
  );
};

export default Modal;
