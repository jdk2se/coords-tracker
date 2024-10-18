<template>
  <div class="btn">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1000;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  right: 4px;
  top: 5px;
  background: #ff6c00e3;
  color: white;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>