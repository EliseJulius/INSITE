/* =====================================================
   INSITE — MAP EDITOR
===================================================== */

const mapCanvas =
  document.getElementById("mapCanvas");

const toolList =
  document.getElementById("toolList");

const backButton =
  document.getElementById("editorBackButton");

const submitButton =
  document.getElementById("submitMapButton");


let selectedObject = null;

let offsetX = 0;
let offsetY = 0;


/* =====================================================
   TOOL CONFIG
===================================================== */

const objectConfig = {

  table: {
    label: "Bàn",
    className: "map-object-table"
  },

  chair: {
    label: "Ghế",
    className: "map-object-chair"
  },

  meeting: {
    label: "Thang máy",
    className: "map-object-meeting"
  },

  door: {
    label: "Cửa",
    className: "map-object-door"
  },

  wall: {
    label: "Tường",
    className: "map-object-wall"
  }

};


/* =====================================================
   ADD OBJECT
===================================================== */

function addObject(type) {

  const config =
    objectConfig[type];

  if (!config) {
    return;
  }


  const object =
    document.createElement("div");


  object.className =
    `map-object ${config.className}`;


  object.dataset.type =
    type;


  object.setAttribute(
    "aria-label",
    config.label
  );


  /*
    Start objects around
    the center of the map.
  */

  const canvasRect =
    mapCanvas.getBoundingClientRect();


  const startX =
    canvasRect.width / 2 - 30;


  const startY =
    canvasRect.height / 2 - 20;


  object.style.left =
    `${startX}px`;


  object.style.top =
    `${startY}px`;


  mapCanvas.appendChild(object);


  enableDragging(object);


  /*
    Automatically select the
    newly created object.
  */

  selectObject(object);

}


/* =====================================================
   SELECT OBJECT
===================================================== */

function selectObject(object) {

  document
    .querySelectorAll(".map-object")
    .forEach(item => {

      item.classList.remove("selected");

    });


  object.classList.add("selected");

  selectedObject =
    object;

}


/* =====================================================
   DRAG
===================================================== */

function enableDragging(object) {

  object.addEventListener(
    "pointerdown",
    startDragging
  );


  function startDragging(event) {

    event.preventDefault();

    selectObject(object);


    const objectRect =
      object.getBoundingClientRect();


    offsetX =
      event.clientX -
      objectRect.left;


    offsetY =
      event.clientY -
      objectRect.top;


    object.setPointerCapture(
      event.pointerId
    );


    object.classList.add("dragging");


    object.addEventListener(
      "pointermove",
      dragObject
    );


    object.addEventListener(
      "pointerup",
      stopDragging
    );


    object.addEventListener(
      "pointercancel",
      stopDragging
    );

  }


  function dragObject(event) {

    const canvasRect =
      mapCanvas.getBoundingClientRect();


    let x =
      event.clientX -
      canvasRect.left -
      offsetX;


    let y =
      event.clientY -
      canvasRect.top -
      offsetY;


    /*
      Keep object inside map.
    */

    const maxX =
      mapCanvas.clientWidth -
      object.offsetWidth;


    const maxY =
      mapCanvas.clientHeight -
      object.offsetHeight;


    x =
      Math.max(
        0,
        Math.min(x, maxX)
      );


    y =
      Math.max(
        0,
        Math.min(y, maxY)
      );


    object.style.left =
      `${x}px`;


    object.style.top =
      `${y}px`;

  }


  function stopDragging(event) {

    object.classList.remove(
      "dragging"
    );


    object.releasePointerCapture?.(
      event.pointerId
    );


    object.removeEventListener(
      "pointermove",
      dragObject
    );


    object.removeEventListener(
      "pointerup",
      stopDragging
    );


    object.removeEventListener(
      "pointercancel",
      stopDragging
    );

  }

}


/* =====================================================
   TOOLBAR
===================================================== */

toolList.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".map-tool"
      );


    if (!button) {
      return;
    }


    const type =
      button.dataset.type;


    /*
      "Thêm" currently acts
      as a quick add table.
    */

    if (type === "add") {

      addObject("table");

      return;

    }


    addObject(type);

  }
);


/* =====================================================
   DELETE SELECTED OBJECT
===================================================== */

mapCanvas.addEventListener(
  "dblclick",
  event => {

    const object =
      event.target.closest(
        ".map-object"
      );


    if (!object) {
      return;
    }


    object.remove();

    selectedObject = null;

  }
);


/* =====================================================
   BACK
===================================================== */

backButton.addEventListener(
  "click",
  () => {

    window.location.href =
      "map-detail.html";

  }
);


/* =====================================================
   SUBMIT FOR APPROVAL
===================================================== */

submitButton.addEventListener(
  "click",
  () => {

    const objects =
      [...document.querySelectorAll(
        ".map-object"
      )]
      .map(object => ({

        type:
          object.dataset.type,

        x:
          parseInt(
            object.style.left
          ),

        y:
          parseInt(
            object.style.top
          )

      }));


    /*
      Save prototype map data.
    */

    localStorage.setItem(
      "insiteMapObjects",
      JSON.stringify(objects)
    );


    localStorage.setItem(
      "insiteMapStatus",
      "pending"
    );


    /*
      Go back to map management.
    */

    window.location.href =
      "manage-map.html?status=pending";

  }
);