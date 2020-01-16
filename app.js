

'strict mode';


let width = 21, height = 21;
//
let matrix = getMatrix(width, height);


let app = new Vue({
  el: "#app",
  data: {
    width: width,
    height: height,
    unlim: true,
    disableFields: false,
    matrix: matrix,
  },
  methods: {
    hundlerChangeWidth: function(e) {
      this.width = e.target.value;
      this.matrix = getMatrix(this.width, this.height);
    },
    hundlerChangeHeight: function(e) {
      this.height = e.target.value;
      this.matrix = getMatrix(this.width, this.height);
    },
    hundlerStop: function(e) {
      let elem = e.target;

      if(elem.checked) {
        clearInterval(timerId);
        this.disableFields = false;
      } else {
        timerId = startGame(this);
        this.disableFields = true;
      }
    },
    hundlerEditGame: hundlerEditGame,
    hundlerOneStep: hundlerOneStep
  }
});

if(app.disableFields) {
  var timerId = startGame(app);
}

// якщо в живої клітини два чи три живих сусіди – то вона лишається жити;
// якщо в живої клітини один чи немає живих сусідів – то вона помирає від «самотності»;
// якщо в живої клітини чотири та більше живих сусідів – вона помирає від «перенаселення»;
// якщо в мертвої клітини рівно три живих сусіди – то вона оживає.
function startGame(app) {

  let timerId = setInterval(() => {
    runOneItetationGame(app);
  }, 100);

  return timerId;
}

function runOneItetationGame(app) {
  let matrix = cloneMatrix(app.matrix);

  matrix.forEach((row, i)=>{
    row.forEach((cell, j)=>{
      let numNeighbor = getNumberNeighbor(app.matrix, i, j, app.unlim);

      if(app.matrix[i][j]) {
        if((numNeighbor !== 2) && (numNeighbor !== 3)) {
          matrix[i][j] = false;
        }
      } else {
        if(numNeighbor === 3) {
          matrix[i][j] = true;
        }
      }
    });
  });

  app.matrix = cloneMatrix(matrix);
}


function getMatrix(width, height) {

  let matrix = [];
  let k = 0;

  for(let i = 0; i < height; i++) {

    matrix[i] = [];
    for(let j = 0; j < width; j++) {
      matrix[i][j] = !!((j + i)%2);
      if(k === 3) {
        k = 0;
      } else {
        k++;
      }
    }

  }

  return matrix;
}


function getNumberNeighbor(matrix, y, x, type) {
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

    return matrix[localY][localX];
  }
}

function cloneMatrix(matrix) {

  let cloneMatrixV = [];

  for(let i = 0; i < matrix.length; i++) {

    cloneMatrixV[i] = [];

    for(let j = 0; j < matrix[0].length; j++) {

      cloneMatrixV[i][j] = matrix[i][j];

    }
  }

  return cloneMatrixV;
}


function hundlerEditGame(e) {
  let cell = e.target;

  if(this.disableFields) {
    return;
  }

  if(!cell.classList.contains("cell")) {
    return;
  }

  let corTarget = index(cell);

  let currentStatus = this.matrix[corTarget[0]][corTarget[1]];

  this.matrix[corTarget[0]][corTarget[1]] = !currentStatus;

  let matrix = this.matrix;
  this.matrix = 0;
  this.matrix = matrix;

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

}

function hundlerOneStep(e) {
  runOneItetationGame(app);
}
