<template>
  <div id="algo">
    <nav-top></nav-top>
    <h4 style="text-align: center;"> <a href="https://docs.google.com/document/d/1PGv5G2DOWXPKYU5WYSg4LPqEpZV2HUcFje11k_dNZ_c/edit?usp=sharing">documentation</a> </h4> 
    <h2 style="text-align: center;" v-on:click="bannerClick(1)">1. Configuration</h2>
    <div id="chapter-1" style="display: none;">
      <input type="radio" name="algo-selector" checked @click="setAlgoGuillaume()"> GUILLAUME
      <input type="radio" name="algo-selector" @click="setAlgoAlex()"> ALEX
      <div v-for="i in 6" :key="i" class="row">
        <div class="col-xs-24">
          <h3 style="text-align: center"> R{{i}}</h3>
          <div class="col-md-8">
            <input type="radio" style="width: 100%;" value="ext" @change="setMode($event, i)" :name="'mode-'+i" checked> 
            <div class="form-group">
              <label>BPM_min - <span class="variable">BPM_delta </span>&#60; BPM &#60; BPM_max + <span class="variable">BPM_delta</span></label>
            </div>
            <div class="form-group">
              <label>D_min - <span class="variable">D_delta </span>&#60; D &#60; D_max + <span class="variable">D_delta</span></label>
            </div>
            <div class="form-group">
              <label>A_min - <span class="variable">A_delta </span>&#60; A &#60; A_max + <span class="variable">A_delta</span></label>
            </div>
          </div>
          <div class="col-md-8" style="margin-top: 22px">
            <div class="form-group">
              &nbsp; BPM_delta = <input type="number" class="form-control" v-model="request_configuration[i - 1].BPM_delta" />
            </div>
            <div class="form-group">
              &nbsp; D_delta = <input type="number" class="form-control" v-model="request_configuration[i - 1].D_delta" />
            </div>
            <div class="form-group">
              &nbsp; A_delta = <input type="number" class="form-control" v-model="request_configuration[i - 1].A_delta" />
            </div>
          </div>
          <div class="col-md-8">
            <input type="radio" style="width: 100%;" value="avg" @change="setMode($event, i)" :name="'mode-'+i"> 
            <div class="form-group">
              <label>BPM_avg - <span class="variable">BPM_delta </span>&#60; BPM &#60; BPM_avg + <span class="variable">BPM_delta</span></label>
            </div>
            <div class="form-group">
              <label>D_avg - <span class="variable">D_delta </span>&#60; D &#60; D_avg + <span class="variable">D_delta</span></label>
            </div>
            <div class="form-group">
              <label>A_avg - <span class="variable">A_delta </span>&#60; A &#60; A_avg + <span class="variable">A_delta</span></label>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tag n</th>
              <th>=</th>
              <th>&#8712;</th>
              <th>&#8709;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag_i in 5" :key="tag_i">
              <td> Tag {{tag_i}} </td>
              <td> <input type="radio" value="eq" :name="'section-'+i+'tag-'+tag_i" checked @change="setTagConfig($event, tag_i, i)"></td>
              <td> <input type="radio" value="inc" :name="'section-'+i+'tag-'+tag_i" @change="setTagConfig($event, tag_i, i)"></td>
              <td> <input type="radio" value="emp" :name="'section-'+i+'tag-'+tag_i" @change="setTagConfig($event, tag_i, i)"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h2 style="text-align: center;" v-on:click="bannerClick(2)">2. Sauvegarder</h2>
    <div id="chapter-2" style="display: none; margin-left: 10px; margin-right: 10px;">
    {{request_configuration}}
    </div>
    <h2 style="text-align: center;" v-on:click="bannerClick(3)">3. Entrées</h2>
    <div id="chapter-3" class="row" style="display: none; padding-left: 10px;">
      <filters :pagination="pagination"></filters>
      <div class="col-xs-12 overflowable" style="border-right: solid 2px">
        <label> Catalogue </label> 
        <table class="table table-striped table-thin table-hover">
          <thead>
            <tr>
              <th style="width: 40px">ID</th>
              <th style="width: 80px;">Metrics</th>
              <th style="width: 120px;">Tag</th>
              <th style="width: 80px;">Artiste</th>
              <th style="width: 120px;">Titre</th>
              <th>Vignette</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in contents" :key="content.id">
              <td @click.prevent="play(content)"><a>PLAY</a> <br/> {{ content.id }}</td>
              <td @click="pushSelection(content)">BPM : {{ content.metrics.bpm }} <br/>
                  A: {{ content.metrics.aggressivity }} <br/>
                  D: {{ content.metrics.danceability }} <br/>
              </td>
              <td @click="pushSelection(content)">
                1. {{ essentia_tags[content.metrics.tag_1] }}<br/> 
                2. {{ essentia_tags[content.metrics.tag_2] }}<br/> 
                3. {{ essentia_tags[content.metrics.tag_3] }}<br/> 
                4. {{ essentia_tags[content.metrics.tag_4] }}<br/> 
                5. {{ essentia_tags[content.metrics.tag_5] }} 
              </td>
              <td @click="pushSelection(content)">{{ content.artist }}</td>
              <td @click="pushSelection(content)">
                {{ content.name }}
                <br />
              </td>
              
              <td @click="pushSelection(content)">
                <img :src="content.thumbnail" class="img-responsive" style="height: 100px;"/>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination :pagination="pagination"></pagination>  
      </div>
      <div class="col-xs-12 overflowable">
        <label> Selection </label>
        <table class="table table-striped table-thin table-hover">
          <thead>
            <tr>
              <th style="width: 40px">ID</th>
              <th style="width: 80px;">Metrics</th>
              <th style="width: 120px;">Tags</th>
              <th style="width: 80px;">Artiste</th>
              <th style="width: 120px;">Titre</th>
              <th>Vignette</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in selection" :key="content.id">
              <td @click.prevent="play(content)"><a>PLAY</a> <br/> {{ content.id }}</td>
              <td @click="removeSelection(content)">BPM : {{ content.metrics.bpm }} <br/>
                  A: {{ content.metrics.aggressivity }} <br/>
                  D: {{ content.metrics.danceability }} <br/>
              </td>
              <td @click="removeSelection(content)">
                1. {{ essentia_tags[content.metrics.tag_1] }}<br/> 
                2. {{ essentia_tags[content.metrics.tag_2] }}<br/> 
                3. {{ essentia_tags[content.metrics.tag_3] }}<br/> 
                4. {{ essentia_tags[content.metrics.tag_4] }}<br/> 
                5. {{ essentia_tags[content.metrics.tag_5] }} 
              </td>
              <td @click="removeSelection(content)">{{ content.artist }}</td>
              <td @click="removeSelection(content)">
                {{ content.name }}
                <br />
              </td>
              <td @click="removeSelection(content)">
                <img :src="content.thumbnail" class="img-responsive" style="height: 100px;"/>
              </td>
            </tr>
          </tbody>
        </table> 
      </div>
    </div>
    <h2 style="text-align: center;" v-on:click="bannerClick(4)">4. Sorties</h2>
    <div id="chapter-4" class="row" style="display: none;">
      <div class="container">
      <button style="margin-bottom: 15px;" id='generate' type="button" @click.prevent="generate()">
        GENERATE
      </button>
      </div>
      <!-- METADATA -->
      <table style="margin-bottom: 10px;" v-if="metrics_input !== {} && metrics_output !== {}">
        <thead>
          <tr>
            <th style="text-align: center;">Type</th>
            <th style="text-align: center;">BPM</th>
            <th style="text-align: center;">A</th>
            <th style="text-align: center;">D</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center;">Entrées</td>
            <td style="text-align: center;">{{metrics_input.bpm}}</td>
            <td style="text-align: center;">{{metrics_input.a}}</td>
            <td style="text-align: center;">{{metrics_input.d}}</td>
          </tr>
          <tr>
            <td style="text-align: center;">Sorties</td>
            <td style="text-align: center;">{{metrics_output.bpm}}</td>
            <td style="text-align: center;">{{metrics_output.a}}</td>
            <td style="text-align: center;">{{metrics_output.d}}</td>
          </tr>
        </tbody>
      </table>

      <table style="margin-bottom: 10px;" v-if="metadatas.length != 0">
        <thead>
          <tr>
            <th style="text-align: center;">Tag entrée</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="style in styles" :key="style">
            <td style="text-align: center;">{{essentia_tags[style]}}</td>
          </tr>
        </tbody>
      </table>

      <table style="margin-bottom: 10px;" v-if="metadatas.length != 0">
        <thead>
          <tr>
            <th style="text-align: center;">Requête</th>
            <th style="text-align: center;">Nombre de hits</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="metadata in metadatas" :key="metadata.id">
            <td style="text-align: center;">R{{metadata.id}}</td>
            <td style="text-align: center;">{{metadata.count}}</td>
          </tr>
        </tbody>
      </table>

      <!-- RESULT -->
      <table class="table table-striped table-thin table-hover" style="width: 100%">
          <thead>
            <tr>
              <th style="width: 100px; text-align: center;">ID</th>
              <th>Metrics</th>
              <th>Tags</th>
              <th>Artiste</th>
              <th>Titre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in res" :key="content.id">
              <td style="text-align: center;" @click.prevent="play(content)"><a>PLAY</a> <br/>{{ content.id }}</td>
              <td>BPM : {{ content.metrics.bpm }} <br/>
                  A: {{ content.metrics.aggressivity }} <br/>
                  D: {{ content.metrics.danceability }} <br/>
              </td>
              <td>
                1. {{ essentia_tags[content.metrics.tag_1] }}<br/> 
                2. {{ essentia_tags[content.metrics.tag_2] }}<br/> 
                3. {{ essentia_tags[content.metrics.tag_3] }}<br/> 
                4. {{ essentia_tags[content.metrics.tag_4] }}<br/> 
                5. {{ essentia_tags[content.metrics.tag_5] }} 
              </td>
              <td>{{ content.artist }}</td>
              <td>
                {{ content.name }}
                <br />
              </td>
            </tr>
          </tbody>
        </table> 
    </div>
      
    <footer-custom></footer-custom>
    <player ref="player"></player>
  </div>
</template>

<script>
import pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";
import player from "./_player.vue";

export default {
  components: {
    pagination: pagination,
    filters: filters,
    player: player
  },

  data: function() {
    return this.$store.state.AlgoStore;
  },

  mounted: function() {
    this.$store.dispatch("AlgoStore/index", this.$route.fullPath);
    this.setRadio()
  },

  methods: {
    play: function(content) {
      this.$refs.player.play(content);
    },
    setRadio: function(){
      this.request_configuration.forEach((element, r_index) => {
        element.tags.forEach((tag, t_index) =>{
          $(`input[name="section-${r_index+1}tag-${t_index+1}"]`).each(
            function(){
              if($(this).val() == tag){
                $(this).prop("checked", true);
              }
            }
          )
        });
      });
    },
    generate: function(){
      if(this.selection.length == 0){
        alert('Ajouter des titres dans la selection')
      }
      else{
        var data = {
          configuration: this.request_configuration,
          selection: this.selection.map(obj=>parseInt(obj['id']))
        };
        this.setMetricsInput();
        $('#generate').css("background-color", "red")
        this.$store.dispatch("AlgoStore/generate", data).then((response)=> {
          $('#generate').css("background-color", "grey")
          
          this.setMetricsOutput();
        });
      }
    },
    setMetricsInput: function(){
      let bpm_total = 0;
      let a_total = 0;
      let d_total = 0;
      this.selection.forEach(content => {
          bpm_total += content.metrics.bpm;
          a_total += content.metrics.aggressivity;
          d_total += content.metrics.danceability;
        }
      );

      var count = this.selection.length
      var data = {
        bpm: (bpm_total / count).toFixed(2),
        a: (a_total / count).toFixed(2),
        d: (d_total / count).toFixed(2)
      };
      this.$store.commit("AlgoStore/setMetricsInput", data); 
    },
    setMetricsOutput: function(){
      let bpm_total = 0;
      let a_total = 0;
      let d_total = 0;
      this.res.forEach(content => {
          bpm_total += content.metrics.bpm;
          a_total += content.metrics.aggressivity;
          d_total += content.metrics.danceability;
        }
      );
      var count = this.res.length;
      var data = {
        bpm: (bpm_total / count).toFixed(2),
        a: (a_total / count).toFixed(2),
        d: (d_total / count).toFixed(2)
      };
      this.$store.commit("AlgoStore/setMetricsOutput", data); 
    },
    bannerClick: function(chapter){
      if(this.display[chapter - 1]){
        $('#chapter-'+chapter).hide();
      }
      else{
        $('#chapter-'+chapter).show();
      } 
      this.$store.commit("AlgoStore/setDisplay", chapter - 1); 
    },
    setMode: function(e, request){
      this.$store.commit("AlgoStore/setMode", {request: request, mode: e.target.value});
    },
    setTagConfig: function(e, tag, request){
      this.$store.commit("AlgoStore/setTag", {request: request, tag: tag, mode: e.target.value});
    },
    pushSelection: function(content){
      this.$store.commit("AlgoStore/pushSelection", content);
    },
    removeSelection: function(content){
      this.$store.commit("AlgoStore/removeSelection", content);
    },
    setAlgoAlex: function(e){
      this.$store.commit("AlgoStore/setAlexAlgo");
      this.setRadio()
    },
    setAlgoGuillaume: function(e){
      this.$store.commit("AlgoStore/setGuillaumeAlgo");
      this.setRadio()
    }
    
  }
};
</script>
