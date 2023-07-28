const swal = require("sweetalert");

export default function useSwal(text, err) {
  return swal({
    icon: "success",
    test: "sample text",
    icon: "error",
  });
}
