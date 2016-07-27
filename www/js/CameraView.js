CameraView = function(video, canvas, detect) {
    var self = this;
    
    this.video = video;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.detect = detect;
    this.stream;
    this.selected = 1;
    
    function tick() {
        requestAnimationFrame(tick);
        if (self.video.readyState === self.video.HAVE_ENOUGH_DATA) {
            self.context.drawImage(self.video, 0, 0, self.canvas.width, self.canvas.height);
            if (self.detect) {
                imageData = self.context.getImageData(0, 0, self.canvas.width, self.canvas.height);
                self.detect(self.context, imageData);
            }
        }
    }

    var getUserMedia = function(videoSource) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
            function successCallback(stream) {
                self.stream = stream;
                if (window.URL) {
                    self.video.src = window.URL.createObjectURL(stream);
                } else if (window.webkitURL) {
                    self.video.src = window.webkitURL.createObjectURL(stream);
                } else if (video.mozSrcObject !== undefined) {
                    self.video.mozSrcObject = stream;
                } else {
                    self.video.src = stream;
                }
            }
            function errorCallback(error) {
                alert("The following error occured: " + err);
            }
            
            var constraints = {video: true};
            if (videoSource !== null) {
                constraints = { video: { optional: [{sourceId: videoSource}] } };
            }
            navigator.getUserMedia(constraints, successCallback, errorCallback);
            requestAnimationFrame(tick);
        }
        else {
            alert("getUserMedia is not supported.");
        }    
    }
    
    MediaStreamTrack.getSources(function(sourceInfos) {
        var id = null;
        for (var i = 0; i != sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            if (sourceInfo.kind === 'video' && sourceInfo.facing === 'environment') {
                id = sourceInfo.id;
            } else {
                console.log('Some other kind of source: ' + sourceInfo.kind + ", " + sourceInfo.id);
            }
        }
        if (id !== null) {
            getUserMedia(id);
        } else {
            alert("Active camera is not found.");
        }
    });
}

CameraView.prototype.stop = function() {
    if (this.video !== undefined) {
        this.video.pause();
    }
    if (this.stream !== undefined) {
        this.stream.stop();
    }
    if (this.video !== undefined) {
        this.video.src = null;
    }
}