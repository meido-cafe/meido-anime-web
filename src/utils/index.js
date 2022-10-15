export const mock = process.env.REACT_APP_NODE_ENV === "development";

export function toLogin() {
  window.location.href = window.location.origin + "/Login";
}

export function MbChange(length) {
  if (typeof length !== "number") {
    length = Number(length);
    if (isNaN(length)) return "未知大小";
  }
  return `${parseInt(length / 1024 / 1024)}MB`;
}

export function copyUrl(url) {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.setAttribute("value", url);
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
  }
  document.body.removeChild(input);
}
