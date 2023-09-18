import globalState from "../globalState.js";
import views from "./views.js";

export default function renderView(View = views.Initial) {
  globalState.Root().data("view", View).html(View());
}
