<template>
    <div>
        <Navbar />
        <TabWrapperVue>
            <TabsVue title="All">
                <AllProducts/>
            </TabsVue>
            <TabsVue title="Bikes">
                <Bikes/>
            </TabsVue>
            <TabsVue title="Bars">
                <Bars/>
            </TabsVue>
            <TabsVue title="Frames">
                <Frames/>
            </TabsVue>
        </TabWrapperVue>
    </div>
</template>

<script>
import Navbar from '@/components/TestNav.vue'
import TabWrapperVue from '@/components/TabWrapper.vue'
import TabsVue from '@/components/Tabs.vue'
import AllProducts from '@/components/ProductFiltering/AllProductsComp.vue'
import Frames from '@/components/ProductFiltering/FramesComp.vue'
import Bars from '@/components/ProductFiltering/HandlebarsComp.vue'
import Bikes from '@/components/ProductFiltering/BikesComp.vue' 

export default {
    components: {
        TabWrapperVue,
        TabsVue,
        Navbar,
        AllProducts,
        Frames,
        Bars,
        Bikes
    }
}
</script>

<style scoped>

</style>