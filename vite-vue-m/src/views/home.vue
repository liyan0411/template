<template>
	<div>
		<h2>{{title}}--{{pageModel.title}}</h2>
		<nut-button type="primary" @click="age++">修改age{{age}}</nut-button>
		<div>pages:{{pages}}</div>
		<nut-button type="primary" @click="update('pageNumber',1)">修改pageNumber{{pageModel.pageNumber}}</nut-button>
		<nut-button type="primary" @click="update('pageSize',10)">修改pageSize{{pageModel.pageSize}} </nut-button>
		<div>
			{{computedAge}}--{{computedAge+123}}
		</div>
		<div class="main" ref="elRefs">
			<span>1231231</span>
		</div>
		
		<nut-button type="primary" @click="go">跳转</nut-button>
	</div>
</template>
<script>
import useCurrentInstance from "@/hooks/hooksuseCurrentInstance";
import { defineComponent,  ref, reactive, computed, watch ,onBeforeMount, onBeforeUnmount, onBeforeUpdate, onErrorCaptured, onMounted, onUnmounted, onUpdated} from "vue"
// 先引入文件
export default defineComponent({
	setup () {
		const { globalProperties:_this } = useCurrentInstance()
		console.log("_this",_this)
		const elRefs=ref(null);
		 onBeforeMount(()=> {
      console.log('beformounted!')
    })
    onMounted(() => {
      console.log('mounted!',elRefs.value)
    })

    onBeforeUpdate(()=> {
      console.log('beforupdated!')
    })
    onUpdated(() => {
      console.log('updated!')
    })

    onBeforeUnmount(()=> {
      console.log('beforunmounted!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })

    onErrorCaptured(()=> {
      console.log('errorCaptured!')
    })
		const title = ref("test")
		const pageModel = reactive({
			title,
			pageNumber: 1,
			pageSize: 20,
			total: 0
		})
		const pages = computed(() => pageModel.pageNumber * pageModel.pageSize)
		console.log(title.value)
		console.log("pageModel", pageModel)
		const age = ref(18)
		watch([() => age.value], ([age],[oldAge]) => {
			console.log(age, oldAge)
		})
		const computedAge = computed({
			get: () => age.value + 1,
			set: value => age.value + value
		})
		const update = (type, limit) => {
			pageModel[type] += limit
		}
		const  go=()=>{
			_this.$router.push("/about")
		}
		return {
			title,
			pageModel,
			update,
			pages,
			age,
			computedAge,
			elRefs,
			go
		}
	}
})
</script>