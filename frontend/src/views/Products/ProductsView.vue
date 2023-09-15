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
            <TabsVue title="Handlebars">
                <Bars/>
            </TabsVue>
            <TabsVue title="Frames">
                <Frames/>
            </TabsVue>
        </TabWrapperVue>
    </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import TabWrapperVue from '@/components/ProductFiltering/TabWrapper.vue'
import TabsVue from '@/components/ProductFiltering/Tabs.vue'
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