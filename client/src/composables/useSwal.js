import swal from "sweetalert";

export default function useSwal(text, err) {
  return swal({
    title: err ? err : "Success",
    text: text || "Some error happened",
    icon: err ? "error" : "success",
  });
}

export function useWarning(text) {
    return swal({
      title: err ? err : "Success",
      text: text || "Some error happened",
      icon: 'warning',
    });
  }