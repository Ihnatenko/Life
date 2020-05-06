'strict mode';


const patterns = [
  [[0]], // Пустота
  [[0, 0, 0], [0, 1, 1], [0, 1, 1]], // кубики
  [[1], [0]], // горизонтальні лінії
  [[1, 0]], // вертикальні лінії
  [[1, 0], [0, 1]], // шахматний порядок
];

const figures = [
  [[1, 1], [1, 1]],
  [[0, 1, 1], [1, 1, 0], [0, 1, 0]],
  [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
  [[0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]], //вулик
  [[0, 1, 0], [1, 1, 1]], //тетрамино
  [[0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 0]], //каравай
  [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]], //пруд
  [[0, 1, 0], [1, 0, 1], [0, 1, 0]], //ящик
  [[1, 0, 1, 1], [1, 1, 0, 1]], //змея
  [[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], //баржа
  [[0, 1, 0], [1, 0, 1], [0, 1, 1]], //лодка
  [[1, 1, 0], [1, 0, 1], [0, 1, 1]], //корабль
  [[0, 1, 0, 0, 0], [1, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 1], [0, 0, 0, 1, 0]], //длинная баржа
  [[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 1]], //длинная лодка
  [[1, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 1]], //длинний корабль

  [[0, 0, 1, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 1, 0, 0]], //вертушка
  [[0, 1, 1, 1], [1, 1, 1, 0]], //жаба
  [[0, 0, 1, 1], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 0, 0]], //бакен
  [
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  ], //часи
  [
    [0, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 1, 1, 0]
  ], //малий космічний корабль
  [
    [0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1, 0]
  ], //середній космічний корабль
  [
    [0, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 0]
  ], //великий космічний корабль
  [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  ], //пульсар
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ], //Планерна рушниця
];



const D = document;

let app = new Vue({
  el: "#app",
  data: {
    toucheDevice: ("ontouchstart" in document.documentElement),
    wayEditable: true,
    menuMobile: false,

    matrix: [],

    stop: true,

    width: 100,
    height: 50,
    unlim: true,

    pattern: 0,
    pat_x_shift: 0,
    pat_y_shift: 0,

    moveFigureStatus: false,
    moveFigure: figures[0],
    selectedFigure: 0,
    figurePosition: {
      top: 0,
      left: 0,
    },

    labelPosition: {
      top: 0,
      left: 0
    },
  },

  methods: {
    hundlerChangeWidth: function(e) {
      this.width = e.target.value;
      this.matrix = getMatrix(this);
    },
    hundlerChangeHeight: function(e) {
      this.height = e.target.value;
      this.matrix = getMatrix(app);
    },
    hundlerEditGame: hundlerEditGame,
    hundlerOneStep: hundlerOneStep,
    hundlerContainerScroll: hundlerContainerScroll,
    hundlerLimits: hundlerLimits,
    hundlerPattern: hundlerPattern,
    hundlerPat_X_Shift: hundlerPat_X_Shift,
    hundlerPat_Y_Shift: hundlerPat_Y_Shift,
    hundlerFigure: hundlerFigure,
    hundlerSelectfigure: hundlerSelectfigure,
    hundlerMousemove: hundlerMousemove,
    hundlerWheel: hundlerWheel,
    hundlerCloseMenu: hundlerCloseMenu,
  }
});

app.matrix = getMatrix(app);
startGame(app);


// якщо в живої клітини два чи три живих сусіди – то вона лишається жити;
// якщо в живої клітини один чи немає живих сусідів – то вона помирає від «самотності»;
// якщо в живої клітини чотири та більше живих сусідів – вона помирає від «перенаселення»;
// якщо в мертвої клітини рівно три живих сусіди – то вона оживає.
function startGame(app) {
  setInterval(() => {
    runOneItetationGame(app);
  }, 100);
}

function runOneItetationGame(app, force) {
  let matrix = cloneMatrix(app.matrix);

  if(app.stop && !force) {
    return;
  }

  matrix.forEach((row, i)=>{
    row.forEach((cell, j)=>{
      let numNeighbor = getNumberNeighbor(app.matrix, i, j, app.unlim);

      if(app.matrix[i][j].life) {
        if((numNeighbor !== 2) && (numNeighbor !== 3)) {
          matrix[i][j].life = false;
        }
      } else {
        if((numNeighbor === 3)) {
          matrix[i][j].life = true;
        }
      }
    });
  });

  app.matrix = cloneMatrix(matrix);
}

function getMatrix(app) {

  const width = app.width;
  const height = app.height;
  const num_pattern = app.pattern;

  let matrix = [];
  let k = 0;

  for(let i = 0; i < height; i++) {

    matrix[i] = [];
    for(let j = 0; j < width; j++) {
      // matrix[i][j] = !!((j + i)%3);
      matrix[i][j] = {};
      matrix[i][j].life = false;
      matrix[i][j].visual = false;
      if(k === 3) {
        k = 0;
      } else {
        k++;
      }
    }
  }

  matrix = makePattern(matrix, num_pattern, app.pat_x_shift, app.pat_y_shift, width, height);

  return matrix;
}

function getNumberNeighbor(matrix, y, x, type) {

  // console.log(type);

  let max_x = matrix[0].length - 1;
  let max_y = matrix.length - 1;


  let numNeighbor = 0;

  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){

      if(!type) {

        if (checkExistenceCell((y + i), (x + j))) {
          if(getCell(y + i, x + j)) {
            numNeighbor++;
          }
        }

      } else {

        if(getCell(y + i, x + j)) {
          numNeighbor++;
        }

      }
    }
  }

  if(getCell(y, x)) {
    numNeighbor--;
  }

  return numNeighbor;

  function checkExistenceCell(y, x) {
    return (0 <= x)
    && (x <= max_x)
    && (0 <= y)
    && (y <= max_y);
  }

  function getCell(y, x) {
    let localX = x, localY = y;

    if(x > max_x) {
      localX = x - max_x - 1;
    }

    if(y > max_y) {
      localY = y - max_y - 1;
    }

    if(x < 0) {
      localX = x + max_x + 1;
    }

    if(y < 0) {
      localY = y + max_y + 1;
    }

    return matrix[localY][localX].life;
  }
}

function cloneMatrix(matrix) {

  let cloneMatrixV = [];

  for(let i = 0; i < matrix.length; i++) {

    cloneMatrixV[i] = [];

    for(let j = 0; j < matrix[0].length; j++) {

      cloneMatrixV[i][j] = {};
      cloneMatrixV[i][j].life = matrix[i][j].life;
      cloneMatrixV[i][j].visual = matrix[i][j].visual;

    }
  }

  return cloneMatrixV;
}

function hundlerEditGame(e) {
  let cell = e.target;

  if(!this.stop) {
    return;
  }

  // Якщо клік не на клітинку - виходим
  if(!cell.classList.contains("cell")) {
    return;
  }

  let corTarget = index(cell);


  if(this.toucheDevice) {
    if(this.wayEditable) {
      this.matrix[corTarget[0]][corTarget[1]].life = true;
    } else {
      this.matrix[corTarget[0]][corTarget[1]].life = false;
    }
  } else {
    if(this.moveFigureStatus) {
      remakeVisualToLife(this);
    } else {
      let currentStatus = this.matrix[corTarget[0]][corTarget[1]].life;
      this.matrix[corTarget[0]][corTarget[1]].life = !currentStatus;
    }
  }

  function index(cell) {
    let row = cell.parentElement;
    let childrenArray = row.children;
    let rowArray = row.parentElement.children;

    let jndex = -1;
    [].forEach.call(childrenArray, function(child, j){
      if(child == cell) {
        jndex = j;
        return;
      }
    })

    let index = -1;
    [].forEach.call(rowArray, function(child, i){
      if(child == row) {
        index = i;
        return;
      }
    })

    return [index, jndex];
  }

  function remakeVisualToLife(app) {
    app.matrix.forEach((row)=>{
      row.forEach((cell)=>{
        if(cell.visual) {
          cell.life = true;
        }
      });
    });
  }

}

function hundlerOneStep(e) {
  runOneItetationGame(app, true);
}

function hundlerWheel(e) {
  // debugger;
  routeFigure(this, 1);

  function routeFigure(app, direct) {
    let figure = app.moveFigure;
    let height = figure.length;
    let width = figure[0].length;
    let newFigure = [];

    for (let i = 0; i < width; i++) {
      newFigure[i] = [];
      for (let j = 0; j < height; j++) {
        if(direct) {
          newFigure[i][j] = figure[height - 1 - j][i];
        } else {
          newFigure[i][j] = figure[j][width - 1 - i];
        }
      }
    }

    // app.moveFigure = [];
    app.moveFigure = newFigure;

    app.matrix = placeFigure(
      app.matrix,
      app.moveFigure,
      app.figurePosition.left,
      app.figurePosition.top,
      app.width,
      app.height,
      true
    );
  }
}

function hundlerContainerScroll(e) {
  this.labelPosition.top  = e.originalTarget.scrollTop;
  this.labelPosition.left = e.originalTarget.scrollLeft;
}

function hundlerLimits(e) {
  // debugger;
  this.hundlerLimits = e.originalTarget.checked;
}

function placeFigure(matrix, figure, x , y, width, height, visual) {

  figure.map((row_figure, x_item)=>{

    row_figure.map((item_figure, y_item)=>{

      if(((x_item + x) < 0) || ((x_item + x + 1) > width)) {
        return;
      }
      if(((y_item + y) < 0) || ((y_item + y + 1) > height)) {
        return;
      }

      if(visual) {
        matrix[y_item + y][x_item + x].visual = item_figure;
      } else {
        matrix[y_item + y][x_item + x].life = item_figure;
      }
    });
  })

  return matrix;
}

function makePattern(matrix, num_pattern, x_shift, y_shift, width, height) {

  const pattern = patterns[num_pattern];
  // const width   = app.width;
  // const height  = app.height;

  const pattern_heigth = pattern.length;
  const pattern_width  = pattern[0].length;

  x_shift = x_shift % pattern_width;
  y_shift = y_shift % pattern_heigth;

  let j = j_start = x_shift - pattern_width;
  let i = y_shift - pattern_heigth;
  while(i < height) {
    j = x_shift - pattern_width;
    while(j < width) {
      matrix = placeFigure(matrix, pattern, j, i, width, height);
      j += pattern_width;
    }
    i += pattern_heigth;
  }

  return matrix;

}

function hundlerPattern(e) {
  this.pattern = e.target.value;
  this.matrix = getMatrix(app);

}

function hundlerPat_X_Shift(e) {
  this.pat_x_shift = e.target.value;
  this.matrix = getMatrix(this);
}

function hundlerPat_Y_Shift(e) {
  this.pat_y_shift = e.target.value;
  this.matrix = getMatrix(this);
}

function hundlerFigure(e) {
  this.moveFigureStatus = true;
  this.moveFigure = figures[e.target.value];
}

function hundlerSelectfigure(e) {
  this.selectedFigure = e.target.value;
}

function hundlerMousemove(e) {

  if(!app.stop) {
    return;
  }

  if(app.moveFigureStatus) {

    if(!e.target.classList.contains("cell")) {
      app.matrix = clearVisual(app.matrix);
      return;
    }

    const x = index(e.target) - 1;
    const y = index(e.target.parentElement) - 1;

    app.figurePosition = {top: y, left: x};
    app.matrix = clearVisual(app.matrix);
    app.matrix = placeFigure(app.matrix, this.moveFigure, x , y, app.width, app.height, true);
  }

  function index(el) {
    if (!el) return -1;
    var i = 0;
    do {
      i++;
    } while (el = el.previousElementSibling);
    return i;
  }

  function clearVisual(matrix) {
    matrix.forEach((row) => {
      row.forEach((item) => {
        item.visual = false;
      })
    });

    return matrix;
  }
}

function hundlerCloseMenu() {
  this.menuMobile = false;
}
