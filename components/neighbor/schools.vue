<template>
    <div>
        <div v-html="neighborhood?.description"></div>
        <div v-if="schools.length">
            <div class="text-3xl my-4">Schools</div>
            <div class="overflow-y-auto">
                <table class="table">
                      <thead>
                        <tr>
                          <th>School Name</th>
                          <th>Address</th>
                          <th>Website</th>
                          <th>School District</th>
                          <th>Instructional Level</th>
                          <th>Grade Low</th>
                          <th>Grade High</th>
                          <th>Student Teacher Ratio</th>
                          <th>Enrollment</th>
                          <th>Virtual</th>
                          <th>Magnet</th>
                          <th>Charter</th>
                          <th>Catholic Type</th>
                          <th>Private Orientation</th>
                          <th>Bilingual School</th>
                          <th>American Indian Enrollment</th>
                          <th>Asian Enrollment</th>
                          <th>Hispanic Enrollment</th>
                          <th>Black Enrollment</th>
                          <th>White Enrollment</th>
                          <th>Pacific Enrollment</th>
                          <th>Mulit-race Enrollment</th>
                          <th>Male Enrollment</th>
                          <th>Female Enrollment</th>
                          <th>Advance Placement</th>
                          <th>Before/After School Program</th>
                          <th>Gifted & Talented Program</th>
                          <th>Bilingual Education</th>
                          <th>Enrollment Change</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr v-for="school in schools" :key="`district-${school.id}`">
                          <td>{{school.name}}</td>
                          <td>{{school.address}}</td>
                          <td>
                            <NuxtLink target="_blank" :to="school.school_url">View Website</NuxtLink>
                          </td>
                          <td>{{school.district_name}}</td>
                          <td>{{school.instructional_level}}</td>
                          <td>{{school.grade_low}}</td>
                          <td>{{school.grade_high}}</td>
                          <td>{{school.student_teacher_ratio}}</td>
                          <td>{{school.enrollment}}</td>
                          <td>{{formatIndicator(school.virtual_school_ind)}}</td>
                          <td>{{formatIndicator(school.magnet_ind)}}</td>
                          <td>{{formatIndicator(school.charter_ind)}}</td>
                          <td>{{school.catholic_school_type}}</td>
                          <td>{{school.private_school_orientation}}</td>
                          <td>{{formatIndicator(school.bilingual_schools_assoc_ind)}}</td>
                          <td>{{school.enroll_am}}</td>
                          <td>{{school.enroll_asian}}</td>
                          <td>{{school.enroll_hisp}}</td>
                          <td>{{school.enroll_black}}</td>
                          <td>{{school.enroll_white}}</td>
                          <td>{{school.enroll_pacific}}</td>
                          <td>{{school.enroll_multiple_races}}</td>
                          <td>{{school.enroll_male}}</td>
                          <td>{{school.enroll_female}}</td>
                          <td>{{formatIndicator(school.ap_ind)}}</td>
                          <td>{{formatIndicator(school.before_and_after_school_prog_ind)}}</td>
                          <td>{{formatIndicator(school.gifted_and_talented_prog_ind)}}</td>
                          <td>{{formatIndicator(school.bilingual_education_ind)}}</td>
                          <td>{{school.enrollment_change_cnt}}</td>
                          <td>{{school.school_rating}}</td>
                        </tr>

                      </tbody>
                </table>
            </div>
        </div>
        <div v-if="schoolDistricts.length > 0">
            <div class="text-3xl my-4">School Districts</div>
            <div class="overflow-y-auto">
                <table class="table">
                    <thead>
                    <tr>
                        <th>District Name</th>
                        <th>Website</th>
                        <th>Grade Low</th>
                        <th>Grade High</th>
                        <th>School Count</th>
                        <th>Enrollment</th>
                        <th>Urban Local</th>
                        <th>Urban Community</th>
                        <th>Per Pupil Expendature</th>
                        <th>Charter Schools</th>
                        <th>Magnet Schools</th>
                        <th>Child Poverty</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="school in schoolDistricts" :key="`school-${school.ext_id}`">
                        <td>{{school.district_name}}</td>
                        <td><NuxtLink :to="school.school_url" target="_blank">View Website</NuxtLink></td>
                        <td>{{school.grade_low}}</td>
                        <td>{{school.grade_high}}</td>
                        <td>{{school.school_cnt}}</td>
                        <td>{{school.enrollment}}</td>
                        <td>{{school.urban_centric_locale_type}}</td>
                        <td>{{school.urban_centric_community_type}}</td>
                        <td>{{school.total_per_pupil_expenditure_amt}}</td>
                        <td>{{school.charter_school_cnt}}</td>
                        <td>{{school.magnet_school_cnt}}</td>
                        <td>{{school.pop_age_5_17_below_poverty_level_pct}}</td>
                        <td>{{school.school_district_rating}}</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="stats?.some(stat => stat.statistics.some(v => v.value))">
            <div class="text-3xl my-4">Statistics</div>
            <div v-for="stat in stats" :key="stat.id">
                <div v-for="value in stat.statistics.filter(v => v.value)" :key="value.id">
                <tr class="ml-5">
                    <td> {{value.name}}:</td>
                    <td v-if="value.value == '0.00'" class="ml-4">
                    <span class="p-2">N/A</span>
                    </td>
                    <td v-else class="ml-4">
                    <span class="p-2">{{value.value}}</span>
                    </td>
                </tr>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const propertyStore = usePropertyStore()
const neighborhood = computed(() => propertyStore.selectedNeighbor)
const schools = computed(() => propertyStore.schools)
const schoolDistricts = computed(() => propertyStore.schoolDistricts)
const stats = computed(() => propertyStore.selectedNeighbor?.statisticTypes) 
</script>

<style lang="css" scoped>
thead tr {
    @apply border-y border-primary1
}

td, th {
    @apply p-3
}

a {
  @apply inline-block px-2 mx-2 w-max text-primary hover:text-primary1 hover:underline;
}
</style>