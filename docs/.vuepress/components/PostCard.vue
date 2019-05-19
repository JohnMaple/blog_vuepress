<template>
  <div class="post">
    <el-card shadow="hover" class="post-card" v-for="item in pageList">
      <div class="featured-media" v-if="item.frontmatter.featured_media">
        <img :src="item.frontmatter.featured_media" class="image">
      </div>

      <div class="post-content" :style="item.frontmatter.featured_media ? '' : styleContent">
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

        <div class="post-foot">
          <div class="post-permalink">
            <router-link :to="item.regularPath">
              <el-button type="primary" plain>阅读全文</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </el-card>

    <el-pagination
      class="post-pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    pages: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageList: [],
      lists: [],
      styleContent: {
        width: "100%"
      }
    };
  },
  mounted() {
    this.filterPostsList();
  },
  methods: {
    handleSizeChange: function(size) {
      this.pageSize = size;
      this.pageList = this.getPageList();
      console.log(this.pageSize); //每页下拉显示数据
    },
    handleCurrentChange: function(current_page) {
      this.currentPage = current_page;
      this.pageList = this.getPageList();
      console.log(this.currentPage); //点击第几页
    },
    filterPostsList() {
      this.pages.forEach(element => {
        if (element.frontmatter.post == true) {
          // element.frontmatter.dateTime = this.formatDate(
          //   element.frontmatter.date
          // );
          element.frontmatter.postDate = this.formatDate(
            element.frontmatter.date
          );
          element.sortDate = this.formatDate(element.frontmatter.date);
          this.lists.push(element);
          this.pageList = this.getPageList();
        }
      });
      // 通过时间进行排序
      this.pageList.sort(this.compare("sortDate"));
      // 总记录数
      this.total = this.pageList.length;
    },
    /**
     * 获取分页数据
     */
    getPageList() {
      let start = this.currentPage == 1 ? 0 : this.currentPage;
      let offset = this.currentPage + this.pageSize;
      return this.lists.slice(start, offset);
    },
    /**
     * @description: format date
     * @param {type}
     * @return:
     */
    formatDate(time, humanize) {
      time = time.replace("T", " ");
      time = time.replace("Z", "");
      let lang = "zh-CN";
      const moment = require("moment");
      moment.locale(lang);
      let postDate = humanize
        ? moment(time).fromNow()
        : moment(time).format("YYYY-MM-DD HH:mm:ss");
      return postDate;
    },
    /**
     * @description: 对时间进行排序
     * @param {type}
     * @return:
     */
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

<style lang="stylus" scoped>
.post {
  margin-top: 2rem;
}

.post-card {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  word-wrap: break-word;
}

.featured-media {
  position: absolute;
  top: 14%;
  right: 1.3rem;
  width: 20%;
  height: 70%;
}

.featured-media img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.post-content {
  width: 76%;
}

.post-content .post-title a {
  font-size: 1.65rem;
}

.post-content .post-title a::before {
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

.post-content .post-title a:hover::before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  -moz-transform: scaleX(1);
  -ms-transform: scaleX(1);
  -o-transform: scaleX(1);
  transform: scaleX(1);
}

.post-content .post-meta {
  margin: 1rem 0;
  color: #999;
  font-family: 'Varela Round', 'Varela Round', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 12px;
}

.post-pagination {
  margin-bottom: 3rem;
  text-align: center;
}
</style>

