<template>
  <div class="star-rating">
    <div class="stars-container">
      <div class="stars">
        <div
            v-for="i in 5"
            :key="i"
        >
          <font-awesome-icon
              icon="fa-solid fa-star"
              class="blue"
          />
        </div>
      </div>
      <div
          class="stars white-layer"
          :style="{ height: `${100 - rating}%` }"
      />
      <div class="stars">
        <div
            v-for="i in 5"
            :key="i"
        >
          <font-awesome-icon
              icon="fa-regular fa-star"
              class="blue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRatingComponent',
  props: {
    rating: {
      type: [Number, String, null],
      required: true
    }
  },
};
</script>

<style>
.star-rating {
  height: 150px;
  width: 24px;
}
.stars-container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 100%;
}
.stars {
  font-size: 20px;
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
}
.white-layer {
  width: 100%;
  position: absolute;
  background-color: white;
  z-index: 0;
  padding: 0;
  margin: 0;
}
.blue {
  color: #198ae3
}
</style>
