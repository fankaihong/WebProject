<template>
	<div id="app">
		<el-container>
			<el-header>
				<el-row :gutter="20" style="background-color:#545c64;">
					<el-col :span="5">
						<div class="grid-content bg-purple">logo
							<!-- logo -->
						</div>
					</el-col>
					<el-col :span="15">
						<div class="grid-content bg-purple">
							<!-- menu -->
							<el-menu style="border-bottom: #545c64;" :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
							 @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
								<el-submenu index="1">
									<template slot="title">首页</template>
									<el-menu-item index="1-1">动态温湿度</el-menu-item>
									<el-menu-item index="1-2">选项2</el-menu-item>
									<el-menu-item index="1-3">选项3</el-menu-item>
									<el-submenu index="1-4">
										<template slot="title">首页</template>
										<el-menu-item index="a">动态温湿度</el-menu-item>
										<el-menu-item index="v">选项2</el-menu-item>
										<el-menu-item index="c">选项3</el-menu-item>
									</el-submenu>
								</el-submenu>
								<el-submenu index="2">
									<template slot="title">报表管理</template>
									<el-menu-item index="2-1">温湿度监控报表</el-menu-item>
									<el-menu-item index="2-2">仓库温湿度报表</el-menu-item>
									<el-menu-item index="2-3">用户管理报表</el-menu-item>
								</el-submenu>
								<el-submenu index="User">
									<template slot="title">用户管理</template>
									<el-menu-item index="UserList">用户查询</el-menu-item>
									<el-menu-item index="UserAdd">用户新增</el-menu-item>
								</el-submenu>
								<el-submenu index="4">
									<template slot="title">我的工作台</template>
									<el-menu-item index="4-1">选项1</el-menu-item>
									<el-menu-item index="4-2">选项2</el-menu-item>
									<el-menu-item index="4-3">选项3</el-menu-item>
								</el-submenu>
							</el-menu>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple">user
							<!-- user -->
						</div>
					</el-col>
				</el-row>
			</el-header>
			<el-main>
				<el-tabs v-model="currentTab" @tab-click="changeView" type="card" closable @tab-remove="removeTab">
					<el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" v-if="item.isExist" :label="item.title" :name="item.name" />
					<keep-alive>
						<component v-bind:is="currentTabComponent"></component>
					</keep-alive>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import UserList from "@/components/UserList.vue";
	import UserAdd from "@/components/UserAdd.vue";
	
	const menuList = [{
		title: '用户查询',
		name: 'UserList',
		isExist: false
	}, {
		title: '用户新增',
		name: 'UserAdd',
		isExist: false
	}];
	
	export default {
		name: "App",
		components: {
			UserList,
			UserAdd
		},
		data() {
			return {
				currentTab: "UserList",
				editableTabsValue: 'UserList',
				editableTabs: menuList
			}
		},
		computed: {
			currentTabComponent: function() {
				return this.currentTab;
			}
		},
		watch: {
			$route(menu) {
				console.dir(menu);
				this.addTab(menu.name);
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				this.addTab(key);
			},
			changeView(tab) {
				this.currentTab = tab.name;
			},
			addTab(targetName) {
				this.editableTabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						if (!tab.isExist) {
							tab.isExist = true;
						}
						this.editableTabsValue = this.currentTab;
						this.currentTab = tab.name;
					}
				});
			},
			removeTab(targetName) {
				this.editableTabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						if (tab.isExist) {
							tab.isExist = false;
							this.currentTab = this.editableTabsValue;
						}
					}
				});
			}
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	a {
		color: white;
		text-decoration: none;
	}

	a.router-link-exact-active {
		color: white;
		text-decoration: none;
	}
</style>
