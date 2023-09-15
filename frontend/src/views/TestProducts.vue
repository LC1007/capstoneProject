<template>
        <TabWrapperVue>
            <TabsVue title="All Products">
                <AllProductsComp/>
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
</template>

<script>
import TabWrapperVue from '@/components/TabWrapper.vue'
import TabsVue from '@/components/Tabs.vue'
import AllProductsComp from '@/components/ProductFiltering/AllProductsComp.vue';
import Frames from '@/components/ProductFiltering/FramesComp.vue'
import Bars from '@/components/ProductFiltering/HandlebarsComp.vue'
import Bikes from '@/components/ProductFiltering/BikesComp.vue'

    export default {
        components:{
            TabWrapperVue,
            TabsVue,
            AllProductsComp,
            Frames,
            Bars,
            Bikes
        }
    }
</script>

<style lang="scss" scoped>

</style>