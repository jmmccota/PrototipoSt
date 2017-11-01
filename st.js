var app = angular.module("app", ["ngSanitize"]);
app.controller("stController",
  function ($scope, $http, $location, $anchorScroll) {
    //$scope.progressbar = ngProgressFactory.createInstance();
    //$scope.progressbar.setParent(document.getElementById('mynetwork'));
    //$scope.progressbar.setAbsolute();
    //$scope.progressbar.setHeight("10px");
    let nos = [
        { id: 1, label: '1u', shape: "box", color: "#7BE141", },
        { id: 2, label: '2ud', shape: "box", color: "#7BE141", },
        { id: 3, label: '3d', shape: "box", color: "#7BE141", },
        { id: 4, label: '4u', shape: "box", color: "#7BE141", },
        { id: 5, label: '5ud', shape: "box", color: "#7BE141", },
        { id: 6, label: '6ud', shape: "box", color: "#7BE141", },
        { id: 7, label: '7ud', shape: "box", color: "#7BE141", },
        { id: 8, label: '8d', shape: "box", color: "#7BE141", },
        { id: 9, label: '9ud', shape: "box", color: "#7BE141", },
        { id: 10, label: '10ud', shape: "box", color: "#7BE141", },
        { id: 11, label: '11ud', shape: "box", color: "#7BE141", },
        { id: 12, label: '12ud', shape: "box", color: "#7BE141", },
        { id: 13, label: '13ud', shape: "box", color: "#7BE141", },
        { id: 14, label: '14u', shape: "box", color: "#7BE141", },
        { id: 15, label: '15ud', shape: "box", color: "#7BE141", },
        { id: 16, label: '16u', shape: "box", color: "#7BE141", },
      ];
      let nosSelecionados = [];
      let arestas = [
        { from: 8, to: 2, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 8, to: 9, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 8, to: 10, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 3, to: 4, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 3, to: 5, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 3, to: 1, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 2, to: 1, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 2, to: 7, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 9, to: 11, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 10, to: 11, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 11, to: 12, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 11, to: 13, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 11, to: 14, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 12, to: 15, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 13, to: 16, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 5, to: 6, arrows: 'to', label: 'd', color: "#00BBBB", },
        { from: 7, to: 6, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 6, to: 15, arrows: 'to', label: 'm', color: "#FF00BB", },
        { from: 15, to: 16, arrows: 'to', label: 'm', color: "#FF00BB", },
      ];
      let arestasSelecionadas = [];
    $scope.patente = true;
    $scope.autor = true;
    $scope.pesquisar = true;
    $scope.orientacoes = [
//      { name: '--Escolha--', value: undefined },
      { name: 'cima-baixo', value: 'UD' },
      { name: 'baixo-cima', value: 'DU' },
      { name: 'direita-esquerda', value: 'LR' },
      { name: 'esquerda-direita', value: 'RL' },
    ];
    $scope.orientacao = undefined;
    let desenhar = (nos, arestas) => {
      var nodes = new vis.DataSet(nos);
      var edges = new vis.DataSet(arestas);
      //var nodes = new vis.DataSet([{ id: 1, label: 'Autor 1', shape: 'box', color: '#7BE141'},
      //    {id: 2, label: 'Patente 1'},
      //    { id: 3, label: 'Autor 2', shape: 'box', color: '#7BE141'},
      //    { id: 4, label: 'Patente 2' },
      //    { id: 5, label: 'Patente 3' },]);
      //var edges = new vis.DataSet([
      //    {from: 1, to: 2, arrows:'to'},
      //    {from: 1, to: 4, arrows:'to'},
      //    {from: 3, to: 4, arrows:'to'},
      //    {from: 3, to: 5, arrows:'to'},
      //]);
      var container = document.getElementById('mynetwork');
      var data = {
        nodes: nodes,
        edges: edges
      };

      var options = {

      };
      if ($scope.orientacao) {
        options = {
          layout: {
            hierarchical: {
              direction: $scope.orientacao,
              sortMethod: "directed"
            }
          },
          //interaction: {dragNodes :false},
          physics: {
            enabled: false
          },
        //  configure: {
        //    filter: function (option, path) {
        //      if (path.indexOf('hierarchical') !== -1) {
        //        return true;
        //      }
        //      return false;
        //    },
        //    showButton: false
        //  }
        }
      }
      var network = new vis.Network(container, data, options);

      network.on("click",
        function (params, ott) {
          let selecionado = this.body.data.nodes._data[params.nodes[0]];
          //params.event = "[original event]";
          //document.getElementById('eventSpan').innerHTML =
          //    '<h2>Click event:</h2>' + JSON.stringify(params, null, 4);
          //params.nodes; // para ser buscado
          $scope.exibe(selecionado.id);
        });
    }
    $scope.frm = {
      Qtde: 50
    };
    $scope.dados = [];

    $scope.mostrarTudo = () => {
      desenhar(nos, arestas);
    }

    $scope.iniciar = (idInit) => {
        if (idInit) {
            desenhar(nos.filter(x => x.id === idInit), undefined);
        } else {
            desenhar([{ id: 4, label: '4u', shape: "box", color: "#7BE141", },], undefined);
        }
        arestasSelecionadas = [];
        nosSelecionados = [];
    }

    $scope.exibe = (id) => {
      let selectedEdges = arestas.filter(x => x.from === id || x.to === id);
      let nodes = [];
      selectedEdges.forEach(e => {
        nodes.push(e.from);
        nodes.push(e.to);
      });
      nodes = nodes.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      nosSelecionados.push(...nos.filter(n => nodes.includes(n.id)));
      nosSelecionados = nosSelecionados.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      arestasSelecionadas.push(...selectedEdges);
      arestasSelecionadas = arestasSelecionadas.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
      desenhar(nosSelecionados,arestasSelecionadas);
    }

    $scope.iniciar = () => {
        desenhar([{ id: 4, label: '4u', shape: "box", color: "#7BE141", },],undefined);
      }

    $scope.mostrarAutor = () => {
      $scope.autor = !$scope.autor;
    }
    $scope.mostrarPatente = () => {
      $scope.patente = !$scope.patente;
    }
    $scope.voltar = () => {
      $scope.pesquisar = true;
    }
  });


  function deepCompare () {
    var i, l, leftChain, rightChain;
  
    function compare2Objects (x, y) {
      var p;
  
      // remember that NaN === NaN returns false
      // and isNaN(undefined) returns true
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
           return true;
      }
  
      // Compare primitives and functions.     
      // Check if both arguments link to the same object.
      // Especially useful on the step where we compare prototypes
      if (x === y) {
          return true;
      }
  
      // Works in case when functions are created in constructor.
      // Comparing dates is a common scenario. Another built-ins?
      // We can even handle functions passed across iframes
      if ((typeof x === 'function' && typeof y === 'function') ||
         (x instanceof Date && y instanceof Date) ||
         (x instanceof RegExp && y instanceof RegExp) ||
         (x instanceof String && y instanceof String) ||
         (x instanceof Number && y instanceof Number)) {
          return x.toString() === y.toString();
      }
  
      // At last checking prototypes as good as we can
      if (!(x instanceof Object && y instanceof Object)) {
          return false;
      }
  
      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
          return false;
      }
  
      if (x.constructor !== y.constructor) {
          return false;
      }
  
      if (x.prototype !== y.prototype) {
          return false;
      }
  
      // Check for infinitive linking loops
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
           return false;
      }
  
      // Quick checking of one object being a subset of another.
      // todo: cache the structure of arguments[0] for performance
      for (p in y) {
          if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
              return false;
          }
          else if (typeof y[p] !== typeof x[p]) {
              return false;
          }
      }
  
      for (p in x) {
          if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
              return false;
          }
          else if (typeof y[p] !== typeof x[p]) {
              return false;
          }
  
          switch (typeof (x[p])) {
              case 'object':
              case 'function':
  
                  leftChain.push(x);
                  rightChain.push(y);
  
                  if (!compare2Objects (x[p], y[p])) {
                      return false;
                  }
  
                  leftChain.pop();
                  rightChain.pop();
                  break;
  
              default:
                  if (x[p] !== y[p]) {
                      return false;
                  }
                  break;
          }
      }
  
      return true;
    }
  
    if (arguments.length < 1) {
      return true; //Die silently? Don't know how to handle such case, please help...
      // throw "Need two or more arguments to compare";
    }
  
    for (i = 1, l = arguments.length; i < l; i++) {
  
        leftChain = []; //Todo: this can be cached
        rightChain = [];
  
        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }
  
    return true;
  }
