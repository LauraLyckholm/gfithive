import Swal from "sweetalert2";

export const customSwal = Swal.mixin({
    customClass: {
        confirmButton: "primary",
        cancelButton: "secondary",
    },
    buttonsStyling: false
});