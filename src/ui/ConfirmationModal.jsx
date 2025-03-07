import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ConfirmationModal({ open, onClose, principalText, onConfirm }) {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style} className="flex flex-col justify-center items-center text-center">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {principalText}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", flexDirection: "row" }}>
                    <div className="space-x-3">
                        <Button variant="contained" color="error" onClick={onConfirm}>
                            Confirmar
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
}
