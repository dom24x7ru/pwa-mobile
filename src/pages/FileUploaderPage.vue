<template>
  <v-container fluid>
    <handy-uploader
      :documentAttachment.sync="registryDocFile"
      :fileUploaderType="'thumbnail'"
      :cardType= "'outlined'"
      :maxFileSize="10240"
      :imageCompressor="true"
      :imageCompressLevel="0.8"
      :maxFileCount="10"
      :badgeCounter="true"
      :lang="'ru'"
      :editPermission="false"
    />
    <br /><br />
  </v-container>
</template>

<script>
import handyUploader from "@/components/fileuploader";

export default {
  name: "FileUploaderPage",
  data() {
    return {
      registryDocFile: [],
    };
  },
  watch: {
    registryDocFile() {
      console.log(this.registryDocFile);
    }
  },
  components: {
    handyUploader
  },
}
</script>