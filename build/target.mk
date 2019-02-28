.PHONY: gen configure build

all: gen configure build

overlay:

force_overlay:

copy:

gen:
	@echo "================ Generate Build File Start ================";
	@cd $(ROOT_DIR); \
	if [ ! -d $(BUILD_DIR) ]; then \
		if [ "Release" == $(BUILD_TARGET) ]; then \
			gn-node gen $(BUILD_DIR); \
		else \
			gn-node gen $(BUILD_DIR); \
		fi \
	else \
		gn-node gen $(BUILD_DIR); \
	fi
	@echo "================= Generate Build File End =================";

configure:
	@echo "============ Configure Build Parameter Start ==============";
	@echo "============= Configure Build Parameter End ===============";

prebuild:

build_target:
	@echo "====================== Build Start ========================";
	@cd $(ROOT_DIR);
	gn-node build ../$(BUILD_DIR);
	@echo "======================= Build End =========================";

build_test:
	@if [ $(tg) == "" ]; then \
		echo "====================== Build Test Start ===================="; \
		echo "======================= Build Test End ====================="; \
	fi

install:

build: build_target build_test install

clean:
	@echo "===================== Make Clean Start =====================";
		rm -rf $(ROOT_DIR)/out
	@echo "====================== Make Clean End ======================";

run:
