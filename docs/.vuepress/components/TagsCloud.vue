<template>
  <div class="tags">
    <div class="tags-cloud">
      <el-card shadow="hover" class="tags-card">
        <div class="tag-btn" v-for="tag in tags">
          <el-button size="medium">
            <span>{{ tag.name }} x</span>
            <el-badge class="mark" type="warning" :value="tag.count"/>
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="tags-post">
      <div class="block">
        <div class="tags-info">
          <h3 class="tag">HTTP</h3>
          <div class="radio">
            <el-radio-group v-model="reverse">
              <el-radio :label="true">倒序</el-radio>
              <el-radio :label="false">正序</el-radio>
            </el-radio-group>
          </div>
        </div>

        <el-timeline :reverse="reverse">
          <el-timeline-item
            timestamp="item.frontmatter.postTime"
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
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
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
      reverse: true,
      tags: [],
      tagsPost: []
    };
  },
  mounted() {
    this.getTags();
  },
  methods: {
    getTags() {
      this.pages.forEach(element => {
        if (element.frontmatter.post == true) {
          element.frontmatter.postDate = this.formatDate(
            element.frontmatter.date
          );
          element.sortDate = this.formatDate(element.frontmatter.date);
          this.lists.push(element);
          this.pageList = this.getPageList();
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
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
</style>

