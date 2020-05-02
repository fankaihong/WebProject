<template>
	<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
		<el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name" />
		<keep-alive>
			<component v-bind:is="currentTabComponent"></component>
		</keep-alive>
	</el-tabs>
</template>
