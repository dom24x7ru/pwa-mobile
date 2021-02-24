<template>
  <v-container fluid>
    <handy-uploader
      :documentAttachment.sync="uploadFiles"
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
import { mapState, mapMutations } from "vuex";
import handyUploader from "@/components/fileuploader";

export default {
  name: "FileUploaderPage",
  data() {
    return {
      uploadFiles: [],
    };
  },
  computed: {
    ...mapState(["files"]),
  },
  created() {
    this.setTitle("Загрузка файлов");
    this.uploadFiles = this.files;
  },
  methods: {
    ...mapMutations(["setFiles", "setTitle"]),
  },
  watch: {
    uploadFiles() {
      this.setFiles(this.uploadFiles);
    }
  },
  components: {
    handyUploader
  },
}
</script>