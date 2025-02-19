import { toast } from "react-toastify";

export const notifySuccess = (message, position, timeClose) => {
  toast.success(message || "Sucesso!", {
    position: position || "top-right",
    autoClose: timeClose || 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  })
  toast.clearWaitingQueue();
}

export const notifyError = (message, position, timeClose) => {
  toast.error(message || "Erro!", {
    position: position || "top-right",
    autoClose: timeClose || 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  })
  toast.clearWaitingQueue();
}

export const notifyInfo = (message, position, timeClose) => {
  toast.info(message || "Aviso!", {
    position: position || "top-right",
    autoClose: timeClose || 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  })
  toast.clearWaitingQueue();
}

export const notifyWarning = (message, position, timeClose) => {
  toast.warning(message || "Aviso!", {
    position: position || "top-right",
    autoClose: timeClose || 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  })
  toast.clearWaitingQueue();
}