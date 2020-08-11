// declare variables
// title bar
const spacer = document.getElementById("spacer");
const workingTitle = document.getElementById("working-title");

// text menu
const textMenuEl = document.getElementById("text-menu");
const menuEscapeEl = document.getElementById("menu-escape");
// file
const fileMenuBtn = document.getElementById("file-menu-btn");
const fileMenuList = document.getElementById("file-menu-list");
const fileMenuNew = document.getElementById("file-menu-new");
const fileMenuSave = document.getElementById("file-menu-save");
const fileMenuOpen = document.getElementById("file-menu-open");
const fileMenuPrint = document.getElementById("file-menu-print");
// edit
const editMenuBtn = document.getElementById("edit-menu-btn");
const editMenuList = document.getElementById("edit-menu-list");
const editMenuUndo = document.getElementById("edit-menu-undo");
const editMenuRedo = document.getElementById("edit-menu-redo");
const editMenuCut = document.getElementById("edit-menu-cut");
const editMenuCopy = document.getElementById("edit-menu-copy");
const editMenuPaste = document.getElementById("edit-menu-paste");
const editMenuSelect = document.getElementById("edit-menu-select");
const editMenuFind = document.getElementById("edit-menu-find");
// insert
const insertMenuBtn = document.getElementById("insert-menu-btn");
const insertMenuList = document.getElementById("insert-menu-list");
const insertMenuDate = document.getElementById("insert-menu-date");
const insertMenuSpecial = document.getElementById("insert-menu-special");
// view
const viewMenuBtn = document.getElementById("view-menu-btn");
const viewMenuList = document.getElementById("view-menu-list");
const viewMenuDark = document.getElementById("view-menu-dark");
const viewMenuLight = document.getElementById("view-menu-light");
// help
const helpMenuBtn = document.getElementById("help-menu-btn");
const helpMenuList = document.getElementById("help-menu-list");
const helpMenuShortcuts = document.getElementById("help-menu-shortcuts");
const helpMenuHomepage = document.getElementById("help-menu-homepage");

// icon menu
const newFileBtn = document.getElementById("new-file");
const openFileBtn = document.getElementById("open-file");
const saveFileBtn = document.getElementById("save-file");
const printFileBtn = document.getElementById("print-file");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const findBtn = document.getElementById("find");
const textModalBtn = document.getElementById("text-modal-btn");

// text modal
const textModal = document.getElementById("text-modal");
const fontFamilySelect = document.getElementById("font-family");
const fontBoldBtn = document.getElementById("font-bold");
const fontItalicBtn = document.getElementById("font-italic");
const fontSizeInput = document.getElementById("font-size");
const textModalEscapeEl = document.getElementById("text-modal-escape");

// text colors
const fontLight = document.getElementById("font-light");
const fontMedium = document.getElementById("font-medium");
const fontDark = document.getElementById("font-dark");
const fontColor = document.getElementById("font-color");
const fontDarkColor = document.getElementById("font-dark-color");
const fontGreen = document.getElementById("font-green");
const fontYellow = document.getElementById("font-yellow");
const fontRed = document.getElementById("font-red");

// textarea
const textArea = document.getElementById("text");

// status bar
const wordCountEl = document.getElementById("word-count");
const wordCountElMod = document.getElementById("word-count-mod");
const authorEl = document.getElementById("author");

// local storage
const setStorage = (text) => {
  localStorage.setItem("text", text);
};

const getStorage = () => {
  textArea.value = localStorage.getItem("text");
  textArea.classList.add(`${localStorage.getItem("font")}`);
  fontFamilySelect.value = localStorage.getItem("font");
  textArea.style.fontSize = `${localStorage.getItem("font-size")}px`;
  fontSizeInput.value = localStorage.getItem("font-size");
  textArea.focus();
  textArea.setSelectionRange(textArea.value.length, textArea.value.length);
};

// functionality variables
let textModalActive = false;
let menuActive = false;
let history = [];
let redoHistory = [];

// menu functionality event listener
const menuFunction = () => {
  menuActive = !menuActive;
  if (menuActive === true) {
    menuEscapeEl.classList.remove("hidden");
  } else {
    menuEscapeEl.classList.add("hidden");
  }
};

// clear menus
const clearMenus = () => {
  fileMenuList.classList.add("hidden");
  editMenuList.classList.add("hidden");
  insertMenuList.classList.add("hidden");
  viewMenuList.classList.add("hidden");
  helpMenuList.classList.add("hidden");
};

// text modal functionality
const textModalFunction = () => {
  textModalActive = !textModalActive;
  if (textModalActive === true) {
    textModalEscapeEl.classList.remove("hidden");
  } else {
    textModalEscapeEl.classList.add("hidden");
  }
};

// save function
const save = () => {
  clearMenus();
  let text = textArea.value;
  text = text.replace(/\n/g, "\r\n"); // retain line breaks
  let blob = new Blob([text], { type: "text/plain" });
  let anchor = document.createElement("a");
  anchor.download = "MySpiffyNote.txt";
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target = "_blank";
  anchor.style.display = "none"; // just to be safe
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

const newDocument = () => {
  setStorage("");
  clearMenus();
  textArea.value = "";
  textArea.focus();
  history = [];
  redoHistory = [];
};

const undo = () => {
  if (history.length > 1) {
    let temp = history.pop();
    redoHistory.push(temp);
    textArea.value = history[history.length - 1];
    setStorage(textArea.value);
  } else if ((history.length = 1)) {
    textArea.value = "";
    history = [];
    return;
  }
};

const redo = () => {
  if (redoHistory.length > 0) {
    let temp = redoHistory.pop();
    history.push(temp);
    textArea.value = temp;
    setStorage(textArea.value);
  } else {
    return;
  }
};

const clearTextAreaFont = () => {
  textArea.classList.remove("sans");
  textArea.classList.remove("sans-alt");
  textArea.classList.remove("serif");
  textArea.classList.remove("serif-alt");
  textArea.classList.remove("mono");
  textArea.classList.remove("cursive");
  textArea.classList.remove("cursive-alt");
};

// click events
fileMenuBtn.onclick = () => {
  if (menuActive === false) {
    menuFunction();
    fileMenuList.classList.remove("hidden");
  }
};
editMenuBtn.onclick = () => {
  if (menuActive === false) {
    menuFunction();
    editMenuList.classList.remove("hidden");
  }
};
insertMenuBtn.onclick = () => {
  if (menuActive === false) {
    menuFunction();
    insertMenuList.classList.remove("hidden");
  }
};
viewMenuBtn.onclick = () => {
  if (menuActive === false) {
    menuFunction();
    viewMenuList.classList.remove("hidden");
  }
};
helpMenuBtn.onclick = () => {
  if (menuActive === false) {
    menuFunction();
    helpMenuList.classList.remove("hidden");
  }
};
textModalBtn.onclick = () => {
  if (textModalActive === false) {
    textModalFunction();
    textModal.classList.remove("hidden");
  }
};
saveFileBtn.onclick = save;
fileMenuSave.onclick = save;
newFileBtn.onclick = newDocument;
fileMenuNew.onclick = newDocument;
undoBtn.onclick = undo;
editMenuUndo.onclick = undo;
editMenuRedo.onclick = redo;
redoBtn.onclick = redo;

fontFamilySelect.onchange = () => {
  clearTextAreaFont();
  textArea.classList.add(`${fontFamilySelect.value}`);
  localStorage.setItem("font", fontFamilySelect.value);
};

fontSizeInput.onchange = () => {
  textArea.style.fontSize = `${fontSizeInput.value}px`;
  localStorage.setItem("font-size", fontSizeInput.value);
};

editMenuSelect.onclick = () => {
  clearMenus();
  textArea.select();
};

// mouseover events
fileMenuBtn.onmouseover = () => {
  if (menuActive === true) {
    fileMenuBtn.focus();
    clearMenus();
    fileMenuList.classList.remove("hidden");
  } else {
    return;
  }
};
editMenuBtn.onmouseover = () => {
  if (menuActive === true) {
    editMenuBtn.focus();
    clearMenus();
    editMenuList.classList.remove("hidden");
  } else {
    return;
  }
};
insertMenuBtn.onmouseover = () => {
  if (menuActive === true) {
    insertMenuBtn.focus();
    clearMenus();
    insertMenuList.classList.remove("hidden");
  } else {
    return;
  }
};
viewMenuBtn.onmouseover = () => {
  if (menuActive === true) {
    viewMenuBtn.focus();
    clearMenus();
    viewMenuList.classList.remove("hidden");
  } else {
    return;
  }
};
helpMenuBtn.onmouseover = () => {
  if (menuActive === true) {
    helpMenuBtn.focus();
    clearMenus();
    helpMenuList.classList.remove("hidden");
  } else {
    return;
  }
};

// menu escapes
menuEscapeEl.onmouseover = () => {
  if (menuActive) {
    menuFunction();
    clearMenus();
    textArea.focus();
  } else {
    return;
  }
};
textModalEscapeEl.onmouseover = () => {
  if (textModalActive) {
    textModal.classList.add("hidden");
    textModalFunction();
    textArea.focus();
  } else {
    return;
  }
};

// text area functions
textArea.oninput = () => {
  if (history.length < 100) {
    history.push(textArea.value);
    setStorage(textArea.value);
    return;
  } else if ((history.length = 100)) {
    history.shift();
    history.push(textArea.value);
    setStorage(textArea.value);
    return;
  } else {
    setStorage(textArea.value);
    return;
  }
};

document.onload = getStorage();

// keypress handler
document.addEventListener("keydown", function (event) {});
