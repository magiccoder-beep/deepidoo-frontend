<template>
  <div class="player-wrapper">
    <div class="audio-wrapper hidden">
      <div class="loader">
        <audio id="player-audio" src="" title="" class="audio" style="width:100%" width="100%"></audio>
      </div>
    </div>

    <div class="modal fade" id="modalPlayer" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content !max-w-[800px]">
          <div class="modal-header">
            <button type="button" class="close" @click.prevent="close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">{{ content.full_name }}</h4>
          </div>
          <div class="modal-body">
            <div class="video-wrapper" style="display: none">
              <video ref="video-player" src title style="width:100%;" width="100%" controls autoplay loop></video>
            </div>
            <div class="image-wrapper" style="display: none">
              <img ref="image-player" style="width: 100%" width="100%" src />
            </div>
            <div :class="'template-wrapper ' + content.orientation">
              <iframe ref="template-player" src frameborder="0" :style="'width: ' + content.width + 'px;height: ' + content.height + 'px;transform: scale('+ content.ratio +');'"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      player: null,
      content: { title: "" }
    };
  },
  mounted: function() {
    this.player = new MediaElementPlayer("player-audio");
  },
  methods: {
    close: function() {
      if (this.content.kind == "music" || this.content.kind == "audio_ad") {
        this.player.setSrc("");
      }
      if (this.content.kind == "image") {
        this.$refs["image-player"].src = "";
      }
      if (this.content.kind == "video") {
        this.$refs["video-player"].src = "";
      }
      if (this.content.kind == "template") {
        this.$refs["template-player"].src = "";
      }

      $("#modalPlayer").modal("hide");
      $(".audio-wrapper").addClass("hidden");
    },
    play: function(content) {
      this.content = content;
      if (content.kind == "music" || content.kind == "audio_ad") {
        this.player.setSrc(content.src);
        this.player.play();

        $(".audio-wrapper").removeClass("full-width");
        $(".audio-wrapper").removeClass("hidden");
      }
    }
  }
};
</script>

<style scoped>
.modal-body {
  text-align: center;
  padding: 0px;
}
#player-image {
  width: 100%;
  height: auto;
}
.cover {
  width: 70px;
  padding-left: 15px;
  float: left;
}
.full-width .cover {
  display: none;
}
.loader {
  float: right;
  width: calc(100% - 70px);
}
.full-width .loader {
  width: 100%;
}
.video-wrapper {
  margin: 0 !important;
  padding: 0 !important;
}
.video-wrapper video {
  margin: 0 !important;
  padding: 0 !important;
  display: block;
}
.audio-wrapper {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  left: 0;
  right: 0;
  width: 100%;
  height: 40px;
  background-color: #000;
}
.audio-wrapper .audio {
  width: 100% !important;
}
.audio-wrapper p {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #000;
  color: #fff;
  padding-left: 15px;
  padding-top: 10px;
  text-transform: capitalize;
}
.audio-wrapper p a {
  color: #fff;
  text-decoration: none !important;
  float: right;
  padding-right: 15px;
}
.template-wrapper {
  width: 598px;
  height: 336px;
  text-align: center;
  overflow: hidden;
}
.template-wrapper.vertical {
  height: 1063px;
}
.template-wrapper iframe {
  border: 0;
  margin: auto;
  transform-origin: 0 0;
}
</style>
