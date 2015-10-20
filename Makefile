SOURCES = test/main.js
DESTINATION = test/main.build.js

#--------------------------------------------------
# BUILD
#--------------------------------------------------

.PHONY:	test

all: test

clean:
	rm ${DESTINATION}

#--------------------------------------------------
# JS TEST BUILD
#--------------------------------------------------

test:
	browserify ${SOURCES} --debug --outfile ${DESTINATION}
