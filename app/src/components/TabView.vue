<template>
	<el-tabs v-model="editableTabsValue" @tab-click="changeView" type="card" closable @tab-remove="removeTab">
		<el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name" />
		<keep-alive>
			<component v-bind:is="currentTabComponent"></component>
		</keep-alive>
	</el-tabs>
</template>
<script>
	import UserList from "@/components/UserList.vue";
	import UserAdd from "@/components/UserAdd.vue";

	export default {
		components: {
			UserList,
			UserAdd
		},
		data() {
			return {
				currentTab: "UserList",
				editableTabsValue: '2',
				editableTabs: [{
					title: '用户查询',
					name: 'UserList'
				}, {
					title: '用户新增',
					name: 'UserAdd'
				}],
				tabIndex: 2
			}
		},
		computed: {
			currentTabComponent: function() {
				return this.currentTab;
			}
		},
		watch:{
			$route(menu){
				console.log(menu);
				// this.addTab(menu.name);
			}
		},
		methods: {
			changeView(tab){
				this.currentTab = tab.name;
			},
			addTab(targetName) {
				this.editableTabs.push({
					title: 'New Tab',
					name: targetName
				});
				++this.tabIndex;
				this.editableTabsValue = targetName;
			},
			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);
			}
		}
	}
</script>
