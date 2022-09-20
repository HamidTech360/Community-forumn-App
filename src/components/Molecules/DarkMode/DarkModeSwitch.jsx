// import Script from "next/script";
import React from "react";

function DarkModeSwitch() {
  /**
   *  Light Switch @version v0.1.4
   */

  const myColors = {
    backgroundColor: "rgb(63, 61, 61)"
  };

  (function () {
    let lightSwitch = document.getElementById("lightSwitch");
    if (!lightSwitch) {
      return;
    }

    /**
     * @function darkmode
     * @summary: changes the theme to 'dark mode' and save settings to local stroage.
     * Basically, replaces/toggles every CSS class that has '-light' class with '-dark'
     */
    function darkMode() {
      // Change Primary Color
      document.querySelectorAll(".text-primary").forEach(element => {
        element.className = element.className.replace(/-primary/g, "-light");
      });
      // document.querySelectorAll("div").forEach(element => {
      //   element.style = element.style.color.replace(/black/g, "white");
      // });
      document.querySelectorAll(".bg-light").forEach(element => {
        element.className = element.className.replace(/-light/g, "-dark");
      });
      document.querySelectorAll(".bg-white").forEach(element => {
        element.className = element.className.replace(
          /bg-white/g,
          `${myColors.backgroundColor}`
        );
        // element.classList.add = element.style.backgroundColor =
        //   "rgb(63, 61, 61)";
      });
      document.querySelectorAll(".card-footer").forEach(element => {
        element.style.backgroundColor =
          element.style.backgroundColor = `${myColors.backgroundColor}`;
      });
      document.querySelectorAll(".card").forEach(element => {
        element.classList.add = element.style.backgroundColor =
          "rgb(63, 61, 61)";
      });

      document.body.classList.add("bg-dark");
      // document.body.style.backgroundColor = "rgb(63, 61, 61)";

      if (document.body.classList.contains("text-dark")) {
        document.body.classList.replace("text-dark", "text-light");
      } else {
        document.body.classList.add("text-light");
      }

      // Tables
      var tables = document.querySelectorAll("table");
      for (var i = 0; i < tables.length; i++) {
        // add table-dark class to each table
        tables[i].classList.add("table-dark");
      }

      // set light switch input to true
      if (!lightSwitch.checked) {
        lightSwitch.checked = true;
      }
      localStorage.setItem("lightSwitch", "dark");
    }

    /**
     * @function lightmode
     * @summary: changes the theme to 'light mode' and save settings to local stroage.
     */
    function lightMode() {
      // Change Primary Color
      document.querySelectorAll(".text-light").forEach(element => {
        element.className = element.className.replace(/-light/g, "-primary");
      });
      // document.querySelectorAll("div").forEach(element => {
      //   element.style = element.style.color.replace(/black/g, "white");
      // });
      document.querySelectorAll(".bg-dark").forEach(element => {
        element.className = element.className.replace(/-dark/g, "-light");
      });
      document.querySelectorAll(".card").forEach(element => {
        element.style.backgroundColor = element.style.backgroundColor = "white";
      });
      document.querySelectorAll(".card-footer").forEach(element => {
        element.style.backgroundColor = element.style.backgroundColor = "white";
      });
      document.querySelectorAll(".card").forEach(element => {
        element.className = element.className.replace(
          /card bg-secondary/g,
          "card"
        );
      });

      document.body.classList.add("bg-light");

      if (document.body.classList.contains("text-light")) {
        document.body.classList.replace("text-light", "text-dark");
      } else {
        document.body.classList.add("text-dark");
      }

      // Tables
      var tables = document.querySelectorAll("table");
      for (var i = 0; i < tables.length; i++) {
        if (tables[i].classList.contains("table-dark")) {
          tables[i].classList.remove("table-dark");
        }
      }

      if (lightSwitch.checked) {
        lightSwitch.checked = false;
      }
      localStorage.setItem("lightSwitch", "light");
    }

    /**
     * @function onToggleMode
     * @summary: the event handler attached to the switch. calling @darkMode or @lightMode depending on the checked state.
     */
    function onToggleMode() {
      if (lightSwitch.checked) {
        darkMode();
      } else {
        lightMode();
      }
    }

    /**
     * @function getSystemDefaultTheme
     * @summary: get system default theme by media query
     */
    function getSystemDefaultTheme() {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        return "dark";
      }
      return "light";
    }

    function setup() {
      var settings = localStorage.getItem("lightSwitch");
      if (settings == null) {
        settings = getSystemDefaultTheme();
      }

      if (settings == "dark") {
        lightSwitch.checked = true;
      }

      lightSwitch.addEventListener("change", onToggleMode);
      onToggleMode();
    }

    setup();
  })();

  return (
    <div className="form-check form-switch" style={{ zIndex: 1 }}>
      <label className="form-check-label col-1" htmlFor="lightSwitch">
        Dark Mode
      </label>
      <input
        className="form-check-input col-1"
        type="checkbox"
        id="lightSwitch"
      />
    </div>
  );
}

export default DarkModeSwitch;
