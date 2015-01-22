SOURCES = main.js

DESTINATION = main.build.js

#--------------------------------------------------
# BUILD
#--------------------------------------------------

.PHONY:	js

all: js

clean:
	rm ${DESTINATION}

#--------------------------------------------------
# JS BUILD
#--------------------------------------------------

js:
	browserify ${SOURCES} --debug --outfile ${DESTINATION}
