<template>
  <div class="tags">
    <div class="tags-cloud">
      <el-card shadow="hover" class="tags-card">
        <!-- <div class="tag-btn" v-for="tag in tags"> -->
        <el-button class="tag-btn" size="medium" v-for="tag in tags" @click="getTagsPost(tag.name)">
          <span>{{ tag.name }}</span>
          <el-badge class="mark" type="warning" :value="tag.value"/>
        </el-button>
        <!-- </div> -->
      </el-card>
    </div>
    <div class="tags-post">
      <div class="block">
        <div class="tags-info">
          <h3 class="tag">{{ this.current_tag }}</h3>
          <div class="radio">
            <el-radio-group v-model="reverse">
              <el-radio :label="false">倒序</el-radio>
              <el-radio :label="true">正序</el-radio>
            </el-radio-group>
          </div>
        </div>

        <el-timeline :reverse="reverse">
          <el-timeline-item
            :timestamp="item.frontmatter.postTime"
            placement="top"
            v-for="item in tagsPost"
          >
            <el-card shadow="hover">
              <div class="post-title">
                <router-link :to="item.regularPath">{{ item.frontmatter.title }}</router-link>
              </div>

              <div class="post-meta">
                <span class="post-date">
                  <i class="el-icon-date"></i>
                  {{ item.frontmatter.postDate }}
                </span>
              </div>

              <div class="post-abstract">
                <p>{{ item.frontmatter.description }}</p>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsCloud",
  props: {
    pages: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      reverse: false,
      tags: [],
      tagsPost: [],
      current_tag: ""
    };
  },
  mounted() {
    this.getTags();
  },
  methods: {
    getTags() {
      let tagsList = [];
      this.pages.forEach(element => {
        if (element.frontmatter.post == true) {
          element.frontmatter.tags.forEach(item => {
            tagsList.push(item);
          });
        }
      });

      let tags = tagsList.reduce((prev, next) => {
        prev[next] = prev[next] + 1 || 1;
        return prev;
      }, {});

      for (let i in tags) {
        let tag = {};
        tag.name = i;
        tag.value = tags[i];
        this.tags.push(tag);
      }
      this.getTagsPost(this.tags[0].name);
    },

    getTagsPost(tag) {
      this.current_tag = tag;
      this.tagsPost = [];
      this.pages.forEach(element => {
        if (
          element.frontmatter.post == true &&
          element.frontmatter.tags.includes(tag)
        ) {
          element.frontmatter.postDate = this.formatDate(
            element.frontmatter.date
          );
          element.frontmatter.postTime = this.formatDate(
            element.frontmatter.date,
            "YYYY-MM-DD"
          );
          this.tagsPost.push(element);
        }
      });
      this.tagsPost.sort(this.compare("postTime"));
    },

    formatDate(time, format, humanize) {
      time = time.replace("T", " ");
      time = time.replace("Z", "");
      let lang = "zh-CN";
      let dateFormat = format || "YYYY-MM-DD HH:mm:ss";
      const moment = require("moment");
      moment.locale(lang);
      let postDate = humanize
        ? moment(time).fromNow()
        : moment(time).format(dateFormat);
      return postDate;
    },
    compare(pro) {
      return function(obj1, obj2) {
        var val1 = obj1[pro];
        var val2 = obj2[pro];
        if (val1 < val2) {
          //正序
          return 1;
        } else if (val1 > val2) {
          return -1;
        } else {
          return 0;
        }
      };
    }
  }
};
</script>

<style lang="stylus">
.tags-card .el-card__body {
  padding-bottom: 10px;
}

.tag-btn {
  // margin: 0px 5px 12px 33px;
  margin-bottom: 10px;
}

.tag {
  color: #258fb8;
}

.tags-info h3 {
  display: inline-block;
}

.tags-info .radio {
  display: inline-block;
  margin-left: 1rem;
}

.post-title a {
  font-size: 1.25rem;
}

.post-title a::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #258fb8;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  -moz-transform: scaleX(0);
  -ms-transform: scaleX(0);
  -o-transform: scaleX(0);
  transform: scaleX(0);
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}

.post-title a:hover::before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  -moz-transform: scaleX(1);
  -ms-transform: scaleX(1);
  -o-transform: scaleX(1);
  transform: scaleX(1);
}
</style>

