<template>
    <div class="">
	<div class="lds-ripple">
        <div></div>
        <div></div>
    </div>
    </div>
</template>

<style lang="css" scoped>
	.lds-ripple {
		@apply inline-flex relative w-20 h-20 items-center justify-center
	}
	.lds-ripple div {
		@apply absolute border-4 border-primary rounded-full;
	  	animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
	  animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
	  0% {
		@apply w-0 h-0 opacity-100
	  }
	  100% {
		@apply w-20 h-20 opacity-0
	  }
	}
</style>