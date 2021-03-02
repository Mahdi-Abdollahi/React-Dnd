
function AddCardModal({open , closeModal, checkInput, submitForm}) {
    if(!open) return null;

    return(
        <div class="modal" style={{display: 'block'}}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button onClick={closeModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={submitForm}>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">card name</label>
                            <input onChange={checkInput} type="text" class="form-control" id="recipient-name" />
                        </div>
                        <div class="modal-footer">
                            <button onClick={closeModal} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onSubmit={submitForm} type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCardModal;