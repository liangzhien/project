	// 合影功能
		       var roleTrigger =   $('.tools .list-role li');
		       var mcFg, mcRole;
		       page.game = 'ttfc';
		     	roleTrigger.each(function(i, elem){
		        	$(elem).on('tap', function(e){
		        		roleTrigger.removeClass('current');
		        		$(this).addClass('current');

		        		mcFg && page.eidtor.stage.removeChild(mcFg);
		        		mcRole && page.eidtor.stage.removeChild(mcRole);
		        		page.game = 'ttfc';
		        		var elemImg =  $(this).find('img');
		        		if(elemImg.length > 0) {
			        		var imgURL = elemImg.attr('src');
						var img = new Image();
						img.onload = function(){
							mcRole = page.eidtor.addImage({'img': img, 'pos': [0, 0]});
							page.game = imgURL.replace(/^.+role-(\w+)\.(?:png|jpg|jpeg)$/i, function(a,b,c){return b});


						}
						img.src = imgURL;
					}

		        		var fg = $(this).data('fg');
		        		if(fg) {
		        			var fgImg = new Image();
		        			fgImg.onload = function(){
		        				mcFg = page.eidtor.addImage({'img': fgImg,  'pos': fg.pos, 'disScale': true, 'disMove': !fg.move});
		        			}
		        			fgImg.src = fg.src;
		        		}


		        	});
		        });
				
			
		     	$(document).on('touchend', function(){
		     		page.eidtor.unSelect();
		     	});

	    		$('.btn-save').on('touchend', function(){
	    			var notice = new page.Notice('照片合成中……');

				pgvSendClick({hottag:'carnival.btn.save.' + page.game});


				// 去除编辑状态的元素
				page.eidtor.toDataURL(function(data){
					// document.write('<img src="' + data + '"/>');
					notice.setInfo('照片上传中……');
					$.post('http://mapps.game.qq.com/lian/a20140714sy/savepic.php', {pic: data}, function(data){
						var data = JSON.parse(data);
						var id = data.data.id;
						if(id) {
							window.location.href = 'share.html?id='+id+'&game=' + page.game;
						}
					})
				});
	    			
	    		})