import React from "react";
import ReactDOM from "react-dom/client";
import { appRouter } from "./src/App";
import { RouterProvider } from "react-router-dom";

import Tracker from "@openreplay/tracker";

const tracker = new Tracker({
  projectKey: "0tpLjDvQF3XA3tAQAy7h",
});
tracker.start();
window.tracker = tracker;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
