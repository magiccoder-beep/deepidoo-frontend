const AlgoStore = {
  namespaced: true,
  state: {
    display: [false, false, false, false, false],
    config: true,
    save: false,
    entries: false,
    generation: false,
    contents: [],
    pagination: {},
    selection: [],
    res: [],
    metadatas: [],
    metrics_input: {},
    metrics_output: {},
    styles: [],
    request_configuration: [
      {
        mode: "ext",
        BPM_delta: 10,
        D_delta: 0,
        A_delta: 0,
        tags: ["eq", "eq", "eq", "eq", "eq"],
        tmp: 0
      },
      {
        mode: "ext",
        BPM_delta: 10,
        D_delta: 0,
        A_delta: 0,
        tags: ["eq", "eq", "eq", "inc", "inc"],
        tmp: 0
      },
      {
        mode: "ext",
        BPM_delta: 10,
        D_delta: 0,
        A_delta: 0,
        tags: ["eq", "eq", "inc", "inc", "inc"],
        tmp: 0
      },
      {
        mode: "ext",
        BPM_delta: 10,
        D_delta: 10,
        A_delta: 10,
        tags: ["eq", "inc", "inc", "inc", "inc"],
        tmp: 0
      },
      {
        mode: "ext",
        BPM_delta: -1,
        D_delta: 20,
        A_delta: 20,
        tags: ["inc", "inc", "inc", "inc", "inc"],
        tmp: 0
      },
      {
        mode: "ext",
        BPM_delta: -1,
        D_delta: -1,
        A_delta: -1,
        tags: ["inc", "inc", "inc", "inc", "inc"],
        tmp: 0
      }
    ],
    essentia_tags: ['rock','pop','alternative','indie','electronic','female vocalists','dance','00s','alternative rock','jazz','beautiful','metal','chillout','male vocalists','classic rock','soul','indie rock','mellow','electronica','80s','folk','90s','chill','instrumental','punk','oldies','blues','hard rock','ambient','acoustic','experimental','female vocalist','guitar','hip-hop','70s','party','country','easy listening','sexy','catchy','funk','electro','heavy metal','progressive rock','60s','rnb','indie pop','sad','house','happy']
  },
  mutations: {
    setAlexAlgo(state, data){
      state.request_configuration = [{mode:"ext",BPM_delta:5,D_delta:20,A_delta:20,tags:["eq","eq","inc","inc","inc"],tmp:36},{mode:"ext",BPM_delta:5,D_delta:15,A_delta:15,tags:["emp","emp","eq","eq","eq"],tmp:40},{mode:"ext",BPM_delta:5,D_delta:10,A_delta:10,tags:["emp","eq","emp","eq","eq"],tmp:33},{mode:"ext",BPM_delta:5,D_delta:5,A_delta:5,tags:["emp","emp","eq","emp","eq"],tmp:38},{mode:"avg",BPM_delta:3,D_delta:3,A_delta:3,tags:["emp","emp","eq","eq","emp"],tmp:18},{mode:"ext",BPM_delta:5,D_delta:5,A_delta:5,tags:["emp","emp","inc","emp","emp"],tmp:28}];
      return state;
    },
    setGuillaumeAlgo(state, data){
      state.request_configuration = [{mode:"ext",BPM_delta:10,D_delta:0,A_delta:0,tags:["eq","eq","eq","eq","eq"],tmp:0},{mode:"ext",BPM_delta:10,D_delta:0,A_delta:0,tags:["eq","eq","eq","inc","inc"],tmp:0},{mode:"ext",BPM_delta:10,D_delta:0,A_delta:0,tags:["eq","eq","inc","inc","inc"],tmp:0},{mode:"ext",BPM_delta:10,D_delta:10,A_delta:10,tags:["eq","inc","inc","inc","inc"],tmp:0},{mode:"ext",BPM_delta:-1,D_delta:20,A_delta:20,tags:["inc","inc","inc","inc","inc"],tmp:0},{mode:"ext",BPM_delta:-1,D_delta:-1,A_delta:-1,tags:["inc","inc","inc","inc","inc"],tmp:0}];
      return state;
    },
    setDisplay(state, data){
      state.display[data] = !state.display[data];
      return state; 
    },
    setConfig(state, data){
      state.config = data;
      return state;
    },
    setSave(state, data){
      state.save = data;
      return state;
    },
    setEntries(state, data){
      state.entries = data;
      return state;
    },
    setGeneration(state, data){
      state.generation = data;
      return state;
    },
    setMode(state, data){
      state.request_configuration[data.request - 1].mode = data.mode;
      return state;
    },
    setTag(state, data){
      state.request_configuration[data.request - 1].tags[data.tag - 1] = data.mode;
      state.request_configuration[data.request - 1].tmp += 1;  
      return state;
    },
    pushSelection(state, data){
      if(state.selection.findIndex((obj) => obj.id === data.id) == -1){
        state.selection.push(data);
      }
      return state;
    },
    removeSelection(state, data){
      var index = state.selection.findIndex((obj) => obj.id === data.id)
      state.selection.splice(index, 1);
      return state;
    },
    many(state, data) {
      state.contents = data.contents;
      state.pagination = data.pagination;
      return state;
    },
    setRes(state, data){
      state.res = data.contents;
      return state;
    },
    setMetadata(state, data){
      state.metadatas = data.metadata;
      return state;
    },
    setStyles(state, data){
      state.styles = data.styles;
      return state;
    },
    setMetricsOutput(state, data){
      state.metrics_output = data;
      return state;
    },
    setMetricsInput(state, data){
      state.metrics_input = data;
      return state;
    }
  },
  actions: {
    index(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function (data) {
          context.commit("many", data);
        }
      });
    },
    generate(context, payload){
      return new Promise((resolve) => {
        $.ajax({
          url: `/algo/generate`,
          type: "post",
          data: payload,
          success: function (data) {
            context.commit("setRes", data);
            context.commit("setMetadata", data);
            context.commit("setStyles", data);
            resolve(data);
          }
        });
      }); 
    }
   },
};

export default AlgoStore;