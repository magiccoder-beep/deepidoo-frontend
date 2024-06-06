<template>
  <div class="w">
    <div class="col-xs-24 col-md-8">
      <div class="form-group">
        <label>{{ $t('device.serial') }}*</label>
        <span class="error">{{errors.serial}}</span>
        <input v-model="device.serial" type="text" class="form-control" />
      </div>

      <div class="form-group">
        <label>{{ $t('device.os') }}*</label>
        <span class="error">{{errors.os}}</span>
        <select v-model="device.os" class="form-control">
          <option v-for="os in device.oses" :value="os.name" :key="os.name">{{ $t(os.name) }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t('device.manufacturer') }}*</label>
        <span class="error">{{errors.manufacturer}}</span>
        <select v-model="device.manufacturer_id" class="form-control">
          <option v-for="manufacturer in device.manufacturers" :value="manufacturer.id" :key="manufacturer.id">{{ manufacturer.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t('batches.batch') }}</label>
        <select v-model="device.batch_id" class="form-control">
          <option v-for="batch in device.batches" :value="batch.id" :key="batch.id">{{ batch.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t('device.model') }}*</label>
        <span class="error">{{errors.shape}}</span>
        <select v-model="device.shape_id" class="form-control">
          <option v-for="shape in device.shapes" :value="shape.id" :key="shape.id">{{ shape.name }}</option>
        </select>
      </div>

      <input type="submit" :class="'btn btn-warning pull-right ' + progress" value="Créer" />
    </div>

    <div v-if="newDevices.length > 0" class="col-xs-24 col-md-16" style="padding-left: 20px;">
      <table class="table table-striped table-thin">
        <thead>
          <tr>
            <th>{{ $t('ref') }}</th>
            <th>{{ $t('type') }}</th>
            <th>{{ $t('device.serial') }}</th>
            <th>{{ $t('device.os') }}</th>
            <th>{{ $t('device.manufacturer') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="newDevice in newDevices" :key="newDevice.id">
            <td>{{ newDevice.id }}</td>
            <td>{{ newDevice.shape.type }}</td>
            <td>{{ newDevice.serial }}</td>
            <td>{{ newDevice.os }}</td>
            <td>{{ newDevice.shape.brand }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-xs-24 col-md-14 col-md-offset-2" style="padding-left: 20px;">
      <h4>Scan QR Code</h4>

      <div class="qrcode-scanner" id="qrcode-scanner">
        <video ref="webcam"></video>
        <canvas ref="preview"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.DeviceStore;
  },

  mounted: function() {
    const video = this.$refs.webcam;
    const canvasElement = this.$refs.preview;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        this.$store.commit("DeviceStore/setStream", stream);
        let canvas = canvasElement.getContext("2d");
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();

        this.$store.commit(
          "DeviceStore/setCameraInterval",
          setInterval(() => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
              canvasElement.height = video.videoHeight;
              canvasElement.width = video.videoWidth;
              canvas.drawImage(
                video,
                0,
                0,
                canvasElement.width,
                canvasElement.height
              );
              var imageData = canvas.getImageData(
                0,
                0,
                canvasElement.width,
                canvasElement.height
              );
              var code = jsQR(
                imageData.data,
                imageData.width,
                imageData.height,
                {
                  inversionAttempts: "dontInvert"
                }
              );

              if (code && code != "") {
                this.$store.commit("DeviceStore/serialScanned", code.data);

                $("#qrcode-scanner").addClass("active");
                setTimeout(function() {
                  $("#qrcode-scanner").removeClass("active");
                }, 1000);
              }
            }
          }, 1000)
        );
      });
  }
};
</script>
