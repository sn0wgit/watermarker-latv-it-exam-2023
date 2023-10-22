(function() {

  'use strict';
  var original;
  var awsFields = ['accessKeyId', 'policy', 'signature', 'bucket'];
  function enableFields(ids) {
    ids.forEach(function(id) {
      document.getElementById(id).removeAttribute('disabled');
    })
  }
  function inputsComplete(ids) {
    return ids.every(function(id) {
      var val = document.getElementById(id);
      return !!val.value;
    });
  }
  function setText(input) {
    var group = input.parentNode.parentNode.parentNode;
    group.querySelector('.form-control').value = input.files[0].name;
  }
  function setTarget(file) {
    enableFields(['watermark-button']);
    Array.prototype.forEach.call(document.querySelectorAll('input[type=radio]'), function (radio) {
      radio.removeAttribute('disabled');
    });
    watermark([file])
      .image(function(target) { return target;  })
      .then(function (img) {
        resetPreviewImage();
        document.getElementById('preview').appendChild(img);
      });
  }
  function setWatermark(file) {
    var preview = document.getElementById('preview'),
        img = document.getElementById('target').files[0],
        position = document.querySelector('input[type=radio]:checked').value;

    if (! original) {
      original = img;
    }

    watermark([original, file])
      .image(watermark.image[position](0.5))
      .then(function(marked) {



        resetPreviewImage();
        document.getElementById('preview').appendChild(marked);

        enableFields(awsFields);
      });
  }


  function resetPreviewImage()
  {
      var imageTag = document.querySelector("#preview img");
      if(imageTag != null)
      {
          imageTag.remove();
          original = null;
          setWatermark(document.getElementById("watermark").files[0]);

      }
  }
  function isWatermarkSelected() {
    var watermark = document.getElementById('watermark-name');
    return !!watermark.value;
  }
  function getFormData(blob, filename, accessKeyId, policy, signature) {
    var fd = new FormData(),
        params = {
          key: filename,
          AWSAccessKeyId: accessKeyId,
          acl: 'private',
          policy: policy,
          signature: signature,
          'Content-Type': '$Content-Type',
          file: [blob, 'watermark.png']
        };

    for (var k in params) {
      var args = Array.isArray(params[k]) ? params[k] : [params[k]];
      fd.append.apply(fd, [k].concat(args));
    }

    return fd;
  }
  function upload(onProgress, onComplete, onError) {
    var req = new XMLHttpRequest(),
        key = "watermark-" + Date.now().toString() + '.png',
        img = document.querySelector('#preview img'),
        keyId = document.getElementById('accessKeyId'),
        policy = document.getElementById('policy'),
        signature = document.getElementById('signature'),
        bucket = document.getElementById('bucket');

    watermark([img])
      .blob(function(target) { return target; })
      .then(function(blob) {
        var fd = getFormData(blob, key, keyId.value, policy.value, signature.value);
        req.open('POST', 'https://' + bucket.value + '.s3.amazonaws.com/', true);
        req.upload.onprogress = onProgress;
        req.onreadystatechange = function() {
          if (req.readyState === 4) {
            if (! /Error/.test(req.responseText)) { //simple test for AWS error response
              onComplete();
            } else {
              onError(req.responseText);
            }
          }
        }
        req.addEventListener('error', onError, false);
        req.send(fd);
      });
  }
  document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('change', function (e) {
      var input = e.target;

      if (input.type === 'file') {
        setText(input);
        input.id === 'target' ? setTarget(input.files[0]) : setWatermark(input.files[0]);
      }

      if (input.type === 'radio' && isWatermarkSelected()) {
        setWatermark(document.getElementById('watermark').files[0]);
      }
    });
    awsFields.forEach(function (id) {
      document.getElementById(id).addEventListener('keyup', function () {
        if (inputsComplete(awsFields)) {
          enableFields(['upload']);
        }
      });
    });
    var form = document.getElementById('uploadForm');
    form.addEventListener('submit', function (e) {
      var progress = document.getElementById('progress'),
          bar = progress.querySelector('.progress-bar'),
          complete = document.getElementById('complete'),
          err = document.getElementById('error');

      progress.style.visibility = 'visible';

      upload(function(e) {
        if (e.lengthComputable) {
          var percent = (e.loaded / e.total) * 100;
          bar.style.width = percent + "%";
        }
      }, function () {
        complete.style.display = 'block';
        err.style.display = 'none';
      }, function () {
        err.style.display = 'block';
        complete.style.display = 'none';
      });

      e.preventDefault();
    });


  });


})();
