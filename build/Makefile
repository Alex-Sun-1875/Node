ifeq (y, $(DEBUG))
	BUILD_TARGET := Debug
else
	BUILD_TARGET := Release
endif

ifeq (, $(tg))
	tg:=hello
endif

BUILD_DIR := out/$(BUILD_TARGET)
PWD := $(shell pwd)
ROOT_DIR := $(shell cd ../; pwd)

include target.mk
