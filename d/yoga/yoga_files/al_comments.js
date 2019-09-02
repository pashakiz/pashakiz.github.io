WComments = {
  getSectionParams: function () {
    var params = {
      app: cur.options.app,
      limit: cur.options.limit
    };
    switch (cur.section) {
      case 'admin_browse':
        params.act = 'admin_browse';
        break;

      case 'admin_bl':
        params.act = 'admin_bl';
        break;

      case 'admin_updates':
        params.act = 'admin_updates';
        break;

      case 'browse':
        params.browse = 1;
        params.replies = cur.options.replies;
        break;

      default: // page
        params.page_query = cur.options.page_query;
        params.part = 1;
    }
    // debugLog(cur.section, params);
    return params
  },
  showMore: function () {
    if (cur.options.offset >= cur.options.count) {
      hide('wcomments_more_link');
      return;
    }
    if (cur.moreLoading) return;
    cur.moreLoading = true;
    var params = extend(WComments.getSectionParams(), {
      offset: cur.options.offset,
      part: 1
    });
    ajax.post('al_widget_comments.php', params, {
      onDone: function (options, rows) {
        ge('wcomments_posts').appendChild(ce('div', {innerHTML: rows}));
        WComments.resizeWidget();
        WComments.applyOptions(options);
        cur.scrollbar && cur.scrollbar.update(false, true);
        cur.moreLoading = false;
      },
      showProgress: function () {
        hide('wcomments_more');
        show('wcomments_more_progress');
        cur.moreLoading = true;
      },
      hideProgress: function () {
        hide('wcomments_more_progress');
        show('wcomments_more');
        cur.moreLoading = false;
      }
    });
  },
  switchSection: function (newSection) {
    var toAdmin = !newSection.indexOf('admin'),
        curTab = ge('wcomments_tab_' + cur.section),
        newTab = ge('wcomments_tab_' + newSection),
        topLnk = ge('wcomments_admin_link');

    toggle('wcomments_admin_nav', toAdmin);
    toggle('wcomments_form', !toAdmin);
    if (curTab) {
      curTab.className = 'wcomments_tab';
    }
    cur.section = newSection;
    if (newTab) {
      newTab.className = 'wcomments_tab_selected';
    }
    removeEvent(topLnk, 'click');
    topLnk.removeAttribute('onclick');
    if (toAdmin) {
      topLnk.innerHTML = getLang('widgets_comments_moder_return');
      topLnk.onclick = function () {
        WComments.switchSection('page');
        return false;
      };
    } else {
      topLnk.innerHTML = getLang('widgets_comments_moder_browse');
      topLnk.onclick = function () {
        WComments.switchSection('admin_browse');
        return false;
      };
    }
    ge('wcomments_posts').innerHTML = '<div class="wcomments_posts_loading"></div>';
    hide('wcomments_more_link');
    var params = extend(WComments.getSectionParams(), {
      // part: 1
    });
    ajax.post('al_widget_comments.php', params, {
      onDone: function (options, rows) {
        ge('wcomments_posts').innerHTML = rows;
        cur.scrollbar && cur.scrollbar.update(false, true);
        WComments.applyOptions(options);
      }
    });
  },
  refresh: function () {
    var params = extend(WComments.getSectionParams(), {
      part: 1
    });
    ajax.post('al_widget_comments.php', params, {
      onDone: function (options, rows) {
        ge('wcomments_posts').innerHTML = rows;
        WComments.applyOptions(options);
        WComments.resizeWidget();
      },
      showProgress: function() {
        ge('wcomments_posts').innerHTML = '<div class="wcomments_posts_loading"></div>';
        hide('wcomments_more_link');
        WComments.resizeWidget();
      },
      hideProgress: function() {
      }
    });
  },
  applyOptions: function (options) {
    if (options.reply_names) {
      cur.options.reply_names = extend(cur.options.reply_names || {}, options.reply_names);
      delete options.reply_names;
    }
    if (options.head_count && cur.section != 'browse') {
      ge('wcomments_count').innerHTML = options.head_count;
      delete options.head_count;
    }
    if (options.script) {
      eval(options.script);
      delete options.script;
    }
    extend(cur.options, options);
    toggle('wcomments_more_link', options.offset < options.count);
  },
  addToBl: function (mid, hash, link) {
    ajax.post('al_widget_comments.php', {act: 'a_add_to_bl', id: mid, hash: hash, app: cur.options.app}, {
      onDone: function (summary) {
        hide('wcomments_bl_label' + mid);
        link.onclick = function () {
          WComments.delFromBl(mid, hash, link);
          return false;
        };
        link.innerHTML = getLang('widgets_remove_from_banlist');
      },
      showProgress: function () {
        hide(link);
        show('wcomments_progress' + mid);
      },
      hideProgress: function () {
        show(link);
        hide('wcomments_progress' + mid);
      }
    });
  },
  delFromBl: function (mid, hash, link) {
    ajax.post('al_widget_comments.php', {act: 'a_del_from_bl', id: mid, hash: hash, app: cur.options.app}, {
      onDone: function (summary) {
        setStyle('wcomments_bl_label' + mid, 'display', 'inline');
        link.onclick = function () {
          WComments.addToBl(mid, hash, link);
          return false;
        };
        link.innerHTML = getLang('widgets_restore_to_banlist');
      },
      showProgress: function () {
        hide(link);
        show('wcomments_progress' + mid);
      },
      hideProgress: function () {
        show(link);
        hide('wcomments_progress' + mid);
      }
    });
  },
  deleteAllAndBan: function (post_id, mid, hash, btn) {
    ajax.post('al_widget_comments.php', {act: 'a_add_to_bl', id: mid, hash: hash, app: cur.options.app}, {
      onDone: function (response) {
        each(geByClass('wcomments_post', ge('wcomments_posts'), 'div'), function () {
          if (!this.id.indexOf('post' + mid) && this.id != 'post' + post_id) {
            hide(this);
          }
        });
        ge('post_del' + post_id).innerHTML = response;
      },
      showProgress: function () {
        lockButton(btn);
      },
      hideProgress: function () {
        unlockButton(btn);
      }
    });
  },
  showLikesBox: function (obj) {
    cur.Rpc.callMethod('showBox', 'widget_like.php?' + ajx2q({act: 'a_stats_box', obj: obj, from: 'wcomments', app: cur.options.app}), {height: 442, width: 498});
  },
  resizeWidget: function () {
    if (!cur.heightEl || !cur.Rpc) return;
    var size = getSize(cur.heightEl)[1];
    if (browser.msie && !browser.msie8 || browser.opera) size += 15;
    if (window.onBodyResize) onBodyResize();

    // if (window.mentions_mod && size < 150 && window.mention) { // fix for mentions list
    //   if (mention.select.isVisible()) {
    //     size += Math.max(getSize(mention.select.list)[1] - 35, 0);
    //   }
    // }
    cur.Rpc.callMethod('resize', size);
  },
  auth: function () {
    var
      screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
      screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
      outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
      features = 'width=554,height=207,left=' + parseInt(screenX + ((outerWidth - 554) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 207) / 2.5), 10);
      this.active = window.open('/login.php?app=-1&layout=widgets', 'vk_openapi', features);
  },
  initQTransport: function (options) {
    window.curNotifier = extend(options, {
      lp_connected: false,
      error_timeout: 1
    });
    WComments.lpInit();
    WComments.lpStart();
  },
  lpGetTransportWrap: function () {
    var queueCont = ge('queue_transport_wrap');
    if (!queueCont) {
      queueCont = ce('div', {id: 'queue_transport_wrap'});
      utilsNode.appendChild(queueCont);
    }
    return queueCont;
  },
  /* Long-poll methods */
  lpInit: function () {
    if (curNotifier.lpMakeRequest) return;
    delete curNotifier.lpMakeRequest;
    re('queue_transport_frame');
    WComments.lpGetTransportWrap().appendChild(
      ce('iframe', {
        id: 'queue_transport_frame',
        name: 'queue_transport_frame',
        src: curNotifier.frame_path
      })
    );
  },
  lpStart: function () {
    curNotifier.lp_started = true;
    WComments.lpCheck();
  },
  lpStop: function () {
    curNotifier.lp_started = false;
    clearTimeout(curNotifier.lp_check_to);
    clearTimeout(curNotifier.lp_error_to);
  },
  lpCheck: function () {
    if (!curNotifier.lp_started) return;
    if (!curNotifier.lpMakeRequest) {
      curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1000);
      return;
    }
    curNotifier.lpMakeRequest(curNotifier.frame_url, {
      act: 'a_check',
      ts: curNotifier.timestamp,
      key: curNotifier.key,
      id: curNotifier.uid,
      wait: 25
    }, function (text) {
      if (!curNotifier.lp_started) return;
      try {
        var success = this.lpChecked(eval('(' + text + ')'));
        if (success) {
          this.lpCheck();
          curNotifier.error_timeout = 1;
        }
      } catch (e) {
        topError('Notify error: ' + e.message);

        curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
      }
    }.bind(this), function (msg) {
//        topError('Notify error: ' + msg);

        curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
    }.bind(this));
  },
  lpChecked: function(response) {
    // debugLog('response', response);
    var failed = response.failed;
    if (failed == 2) {
      curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
      if (curNotifier.error_timeout < 64) {
        curNotifier.error_timeout *= 2;
      }
      return false;
    } else if (failed) {
      throw getLang('global_unknown_error');
    }

    curNotifier.timestamp = response.ts;
    if (!cur.section.indexOf('admin')) {
      return true;
    }
    if (cur.options.fixed_height) {
      var scrollCont = ge('wcomments_posts_wrap'),
          postsCont = ge('wcomments_posts'),
          st = scrollCont.scrollTop, sh = postsCont.offsetHeight;
    }
    each (response.events, function (k, v) {
      WComments.pushEvent(v);
    });
    if (cur.options.fixed_height) {
      if (st > 100) {
        scrollCont.scrollTop = st + (postsCont.offsetHeight - sh);
      } else {
        scrollCont.scrollTop = 0;
      }
      cur.scrollbar && cur.scrollbar.update(false, true);
    }
    return true;
  },
  lpGetKey: function () {
    var stNow = vkNow();
    ajax.post('al_widget_comments.php', {act: 'a_get_key', id: curNotifier.uid, app: cur.options.app, page_query: cur.options.page_query}, {
      onDone: function (key, ts) {
        curNotifier.timestamp = ts;
        curNotifier.key = key;
        this.lpCheck();
      }.bind(this),
      onFail: function (code) {
        if (code == 3) {
          location.reload();
          return;
        }
        curNotifier.error_timeout = 64;
        this.lp_error_to = setTimeout(this.lpGetKey.bind(this), curNotifier.error_timeout * 1000);
        if (curNotifier.error_timeout < 64) {
          curNotifier.error_timeout *= 2;
        }
        return true;
      }.bind(this)
    });
  },
  pushEvent: function (ev_text) {
    var ev = ev_text.split('<!>'), ev_ver = ev[0], ev_type = ev[1], post_id = ev[2], el = ge('post' + post_id);
    if (ev_ver != cur.options.qversion) {
      location.reload();
      return;
    }
    switch (ev_type) {
      case 'new_post':
        if (el) break;
        var cont = ge('wcomments_posts'),
            newEl = ce('div', {innerHTML: Wall.getNewPostHTML(ev, cur.options.is_admin)}).firstChild,
            newCnt = intval(ev[8]),
            posts = geByClass('wcomments_post', cont, 'div'),
            lastPost = posts && posts.length && posts[posts.length - 1];

        cont.insertBefore(newEl, cont.firstChild);
        placeholderSetup(ge('reply_field' + post_id));
        setStyle(newEl, {backgroundColor: '#FEFAE4'});
        animate(newEl, {backgroundColor: '#FFF'}, 6000);
        if (cur.section != 'browse') {
          val('wcomments_count', newCnt > 0 ? getLang('widgets_comments_top_count', newCnt) : getLang('widgets_comments'));
        }
        lastPost && lastPost.parentNode.removeChild(lastPost);
        break;

      case 'del_post':
        if (el) {
          !cur.wallMyDeleted[post_id] && hide(el);
          cur.options.offset--;
        }
        break;

      case 'res_post':
        el && cur.options.offset++;
        break;

      case 'new_reply':
        if (!el || cur.wallMyReplied[post_id] || ge('post' + ev[3])) break;

        var repliesEl = ge('replies' + post_id),
            newEl = ce('div', {innerHTML: Wall.getNewReplyHTML(ev, cur.options.is_admin)}).firstChild,
            highlight = false;

        if (isVisible('reply_link' + post_id)) {
          re('reply_link' + post_id);
          show('replies_wrap' + post_id);
          highlight = true;
        } else {
          var openEl = repliesEl.nextSibling, newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;
          if (!cur.wallMyOpened[post_id]) {
            addClass(newEl, 'new_reply');
            if (!openEl || openEl.className != 'replies_open') {
              openEl = ce('div', {className: 'replies_open', onclick: Wall.openNewComments.pbind(post_id)});
              repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
            }
            openEl.innerHTML = getLang('news_x_new_replies_more', Math.min(100, newCnt));
            openEl.newCnt = newCnt;
          } else {
            if (openEl && openEl.className == 'replies_open') re(openEl);
            highlight = true;
            var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                shown = geByClass('reply', repliesEl, 'div').length + 1,
                total = shown;
            if (headerEl) {
              total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
            }
            if (total > 5 || shown < total) {
              if (!headerEl) {
                repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
              }
              Wall.updateRepliesHeader(post_id, headerEl, shown, total);
            }
          }
        }
        repliesEl.appendChild(newEl);
        if (highlight) {
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000);
        }
        break;

      case 'del_reply':
        !cur.wallMyDeleted[post_id] && re(el);
        break;
    }
  },
  updateMini: function () {
    if (cur.options.mini == 'auto') {
      cur.options.mini = cur.heightEl.clientWidth < 630;
    } else {
      cur.options.mini = intval(cur.options.mini) == 1;
    }
    toggleClass('wcomments_posts', 'wide_wall_module', !cur.options.mini);
    toggleClass(bodyNode, 'font_medium', !cur.options.mini);
  },
  init: function (options) {
    cur.options = options;
    extend(cur, {
      oid: options.user_id,
      postTo: options.user_id,
      heightEl: ge('wcomments_page'),
      fullPostView: 1,
      fullPostHeight: 56,
      noNavGo: true,
      section: 'posts',
      noAwayCheck: true
    });
    cur.section = options.browse ? 'browse' : 'posts';
    Wall.init(options);
    WComments.updateMini();
    if (options.fixed_height) {
      if (browser.msie6) {
        setStyle('wcomments_posts_wrap', {height: options.fixed_height - 127});
      } else {
        setStyle('wcomments_posts_wrap', {maxHeight: options.fixed_height - 127});
      }
      cur.scrollbar = new Scrollbar('wcomments_posts_wrap', {
        more: WComments.showMore,
        startDrag: function() {
          try {
            cur.Rpc.callMethod('startDrag');
          } catch(e) {}
        },
        stopDrag: function() {
          try {
            cur.Rpc.callMethod('stopDrag');
          } catch(e) {}
        }
      });

      cur.mouseMove = function(ev) {
        cur.scrollbar.mouseMove(ev);
      }
      cur.mouseUp = function() {
        cur.scrollbar.mouseUp();
      }
    }
    if (options.qtransport) {
      WComments.initQTransport(options.qtransport);
    }
    // Times update interval. For relative time correction
    timeUpdateInt = setInterval(function () {WComments.updateTimes();}, 10000);

    cur.RpcMethods = {
      onInit: function() {
        setTimeout(function () {
          WComments.resizeWidget();
        }, 0);
        setTimeout(function () {
          WComments.resizeWidget();
        }, 500);
      },
      mouseMove: function(screenY) {
        cur.mouseMove(screenY);
      },
      mouseUp: function() {
        cur.mouseUp();
      }
    };
    try {
      cur.Rpc = new fastXDM.Client(cur.RpcMethods);
      cur.resizeInt = setInterval(WComments.resizeWidget, 1000);
    } catch (e) {
      debugLog(e);
      // Return scroll
    }
    if (!options.user_id) {
      addEvent('send_post', 'click', WComments.auth);
      addEvent('post_field', 'click focus', WComments.auth);
      // addEvent(document, 'click', WComments.auth);
    }
  },
  langWordNumeric: function(num, words, arr) {
    if (num < words.length) {
      return words[num];
    }
    return langNumeric(num, arr);
  },
  updateTimes: function() {
    var timeNow = intval(vkNow() / 1000), rm_class = [];
    each(geByClass('rel_date_needs_update', ge('wcomments_posts'), 'span'), function(k, v) {
      if (!v) return;
      var timeRow = intval(v.getAttribute('time')), diff = timeNow - timeRow, timeText = v.getAttribute('abs_time');
      if (diff < 5) {
        timeText = getLang('news_just_now');
      } else if (diff < 60) {
        timeText = WComments.langWordNumeric(diff, cur.lang.news_X_seconds_ago_words, cur.lang.news_X_seconds_ago);
      } else if (diff < 3600) {
        timeText = WComments.langWordNumeric(intval(diff / 60), cur.lang.news_X_minutes_ago_words, cur.lang.news_X_minutes_ago);
      } else if (diff < 4 * 3600) {
        timeText = WComments.langWordNumeric(intval(diff / 3600), cur.lang.news_X_hours_ago_words, cur.lang.news_X_hours_ago);
      } else {
        rm_class.push(v);
      }
      v.innerHTML = timeText;
    });
    each (rm_class, function () {
      removeClass(this, 'rel_date_needs_update');
    });
  }
};



var Wall = {
  checkTextLen: function(inp, warn, force) {
    return;
  },
  checkPostLen: function(val, force) {
    return;
  },
  showEditPost: function() {
    if (cur.viewAsBox) {
      setTimeout(function() { ge('post_field').blur() }, 0);
      return cur.viewAsBox();
    }

    if (cur.editing === 0) return;
    if (cur.withMentions && !cur.mentionsAdded) {
      cur.mentionsAdded = true;
      stManager.add(['ui_controls.css', 'ui_controls.js', 'mentions.js'], function() {
        initMentionClass();
        cur.postMention = new MentionAutocomplete('post_field', {
          minHeight: cur.fullPostView ? (cur.fullPostHeight || 50) : 32,
          introText: getLang('profile_mention_start_typing'),
          noResult: getLang('profile_mention_not_found'),
          onSubmit: Wall.sendPost,
          checkLen: Wall.checkPostLen,
          onValueChange: (cur.wallAddMedia || {}).checkPostLink
        });
        addEvent(cur.postMention.rtaEl, 'focus', Wall.showEditPost);
        if (ge('post_field').focused !== false) {
          triggerEvent(ge('post_field'), 'focus');
        }
      });
    } else if (cur.postMention) {
      cur.postMention.options.minHeight = cur.fullPostView ? (cur.fullPostHeight || 50) : 32;
    }
    Wall.hideEditPostReply();
    show('submit_post');
    autosizeSetup('post_field', {minHeight: cur.fullPostView ? (cur.fullPostHeight || 50) : 32});
    cur.editing = 0;
  },
  hideEditPost: function(force) {
    cur.editing = false;
    var rf = ge('post_field');
    if (browser.opera_mobile || !rf || cur.fullPostView) return;
    if (!force && rf.getValue && trim(rf.getValue())) return;
    hide('submit_post');
    if (rf && !rf.value) {
      if (cur.postMention) {
        cur.postMention.options.minHeight = 14;
      }
      setStyle(rf, {height: 14});
      if (rf.phonsize) rf.phonsize();
    }
  },
  sendPost: function() {
    var addmedia = cur.wallAddMedia || {}, media = addmedia.chosenMedia || {}, share = (addmedia.shareData || {});
    var msg = ge('post_field').getValue();
    if (share.initialPattern && (trim(msg) == share.initialPattern)) {
      msg = '';
    }
    if (media[0] == 'share') {
      if (share.failed || !share.url) {
        media = {};
      } else {
        media[1] = share.user_id + '_' + share.photo_id;
      }
    }

    if (!media[0] && !msg) {
      elfocus('post_field');
      return;
    }
    var params = {
      act: 'post',
      attach1_type: media[0],
      attach1: media[1],
      message: msg,
      to_id: cur.postTo,
      type: 'widget_comments',
      status_export: '',
      widget_app: cur.options.app,
      widget_page_url: cur.options.page_url,
      widget_page_title: cur.options.page_title,
      widget_page_desc: cur.options.page_desc,
      widget_page_query: cur.options.page_query,
      hash: cur.options.post_hash
    };

    if (media[0] == 'poll') {
      var poll = addmedia.pollData();
      if (!poll) {
        return;
      }
      params = extend(params, poll);
    }

    if (media[0] == 'share') {
      if (share.images && share.images.length) {
        addmedia.uploadShare(Wall.sendPost);
        return;
      }
      params = extend(params, {
        url: share.url,
        title: share.title,
        description: share.description,
        extra: share.extra,
        extra_data: share.extraData,
        open_graph_data: (share.openGraph || {}).data,
        open_graph_hash: (share.openGraph || {}).hash
      });
    }

    ajax.post('al_wall.php', params, {
      onDone: function(post_id) {
        if (post_id) {
          var params = {
            act: 'a_post',
            post: post_id,
            hash: cur.options.post_hash,
            app: cur.options.app,
            limit: cur.options.limit,
            'export': isChecked('wcomments_export')
          };

          ajax.post('al_widget_comments.php', params, {
            onDone: function (options, rows) {
              if (cur.section == 'posts' && cur.Rpc) {
                cur.Rpc.callMethod('publish', 'widgets.comments.new_comment', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
                // cur.Rpc.callMethod('onChange', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
              }
              ge('wcomments_posts').innerHTML = rows;
              WComments.applyOptions(options);
              cur.scrollbar && cur.scrollbar.update(false, true);
            },
            showProgress: function() {
              lockButton(ge('send_post'));
            },
            hideProgress: function() {
              unlockButton(ge('send_post'));
            }
          });
        }

        var rf = ge('post_field');
        if (cur.withMentions) {
          var mention = data(rf, 'mention');
          if (mention) {
            mention.rtaEl.innerHTML = '';
            hide(mention.cont);
            show(rf);
          }
        }
        rf.value = '';
        rf.blur();
        rf.phonblur();
        Wall.hideEditPost(true);
        if (cur.wallAddMedia) cur.wallAddMedia.unchooseMedia();
        hide('post_warn');
        return

        // Wall.receive(rows, names);
      },
      showProgress: function() {
        lockButton(ge('send_post'));
      },
      hideProgress: function() {
        unlockButton(ge('send_post'));
      }
    });
  },

  _repliesLoaded: function(post, hl, replies, names) {
     var r = ge('replies' + post), openEl = r.nextSibling;
     if (hl) {
      var el = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      var h = r.offsetHeight;
      r.innerHTML = replies;
      el.scrollTop = intval(el.scrollTop) + (r.offsetHeight - h);
      setTimeout(Wall.highlightReply.pbind('post' + hl), 0);
    } else {
      r.innerHTML = replies;
    }
    if (openEl && openEl.className == 'replies_open') {
      re(openEl);
    }
    extend(cur.options.reply_names, names);
  },
  highlightReply: function(el) {
    el = ge(el);
    if (!el) return;

    var hlfunc = animate.pbind(el, {backgroundColor: '#ECEFF3'}, 200, function() {
      setTimeout(function() {
        animate(el, {backgroundColor: '#FFF'}, 200);
      }, 1000);
    });

    var xy = getXY(el), top = xy[1] - (bodyNode.scrollTop || htmlNode.scrollTop || 0);
    if (top < 0) {
      var cont = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      animate(cont, {scrollTop: cont.scrollTop + top - 50}, 300, hlfunc);
    } else {
      hlfunc();
    }
  },
  showReply: function(post, reply) {
    if (cur.viewAsBox) return false;
    var p = ge('post' + reply);
    if (p) {
      Wall.highlightReply(p);
    } else {
      Wall.showReplies(post, false, reply);
    }
    return false;
  },
  showReplies: function(post, count, hl, ev) {
    if (checkEvent(ev || window.event)) { return; }
    if (cur.viewAsBox) return cur.viewAsBox();
    hide('wrh_text' + post);
    cur.wallMyOpened[post] = (count != 3);
    ajax.post('al_wall.php', {act: 'get_replies', post: post, count: count}, {
      onDone: Wall._repliesLoaded.pbind(post, hl),
      onFail: show.pbind('wrh_text' + post),
      progress: 'wrh_prg' + post
    });
    return false;
  },
  showEditReply: function(post) {
    if (!vk.id) {
      WComments.auth();
      return false;
    }

    var rf = ge('reply_field' + post),
        postEl = ge('post' + post),
        fakeBox = ge('reply_fakebox' + post),
        realBox = ge('reply_box' + post),
        replyLink;

    if (fakeBox) {
      realBox = se(rs(cur.wallTpl.reply_form, {post_id: post}));
      fakeBox.parentNode.replaceChild(realBox, fakeBox);
      rf = ge('reply_field' + post);
      !browser.msie6 && placeholderSetup(rf, {pad: {margin: 0, padding: 0}});
    }
    if (cur.editing === post) {
      elfocus(rf);
      return;
    }
    Wall.hideEditPostReply();
    addClass(postEl, 'reply_box_open');
    setStyle('replies_wrap' + post, {display: ''});
    autosizeSetup(rf, {minHeight: geByClass1('reply_form_image', realBox, 'a').clientHeight - 8});
    Wall.replyFormHintUpdate(post);
    cur.editing = post;
    setTimeout(elfocus.pbind(rf), 0);
  },
  hideEditReply: function(post) {
    cur.editing = false;

    var rf = ge('reply_field' + post),
        postEl = ge('post' + post),
        replyName = cur.reply_to && cur.options.reply_names[cur.reply_to[0]],
        v = trim(val(rf)),
        replyLink;
    if (!rf) return;
    if (replyName && isArray(replyName)) {
      if (!v || !replyName[1].indexOf(v)) {
        val(rf, '');
        v = '';
      }
    }
    if (browser.opera_mobile || browser.safari_mobile || v) return;
    removeClass(postEl, 'reply_box_open');
    if (replyLink = ge('reply_link' + post)) {
      hide('replies_wrap' + post);
    }
    rf.blur();
    if (!rf.active) {
      setStyle(rf, {height: 14});
    }
    rf.phonblur && rf.phonblur();
    val('reply_to' + post, '');
    hide('reply_to_title' + post);
    cur.reply_to = false;

    var point = cur.replySubmitSettings;
    point && point.tt && point.tt.destroy();
  },
  replyTo: function(post, toMsgId, toId, event) {
    Wall.showEditReply(post);
    val('reply_to' + post, toMsgId);
    cur.reply_to = [toId, toMsgId];
    var replyName = cur.options.reply_names[toId];
    if (isArray(replyName)) {
      val('reply_to_title' + post, replyName[0]);
      var rf = ge('reply_field' + post),
          replyNameOld = cur.reply_to && cur.options.reply_names[cur.reply_to[0]],
          v = trim(val(rf));
      if (!v || replyNameOld && isArray(replyNameOld) && !replyNameOld[1].indexOf(v)) {
        val(rf, !checkEvent(event) ? replyName[1] : '');
      }
    } else {
      val('reply_to_title' + post, replyName);
    }
    show('reply_to_title' + post);
    Wall.replyFormHintUpdate(post);
    return false;
  },
  replySubmitTooltip: function (post, over) {
    var box = ge('reply_box' + post),
        place = box && geByClass1('reply_hint', box, 'div'),
        point = cur.replySubmitSettings;

    if (!place) return;

    if (!point) {
      point = cur.replySubmitSettings = ce('div', {className: 'reply_multiline_tt_point'});
    }
    if (!over) {
      if (point && point.tt && point.tt.hide) {
        point.tt.hide();
      }
      return;
    }

    if (point.parentNode == place && point.tt && point.tt.show) {
      point.tt.show();
      return;
    }

    point.tt && point.tt.destroy && point.tt.destroy();
    place.insertBefore(point, place.firstChild);
    var ctrlSubmit = cur.wallTpl.reply_multiline ? 1 : 0,
        hint = rs(cur.wallTpl.reply_multiline_hint, {
      enabled: ctrlSubmit ? 'on' : '',
      disabled: !ctrlSubmit ? 'on' : ''
    });

    showTooltip(point, {
      text: hint,
      className: 'reply_multiline_tt rich wall_tt',
      shift: [3, 15, 13],
      forcetodown: 1,
      slide: 15,
      showdt: 400,
      hidedt: 400,
      hasover: 1,
      onCreate: function () {
        radioBtns.reply_submit = {
          els: Array.prototype.slice.apply(geByClass('radiobtn', ge('reply_submit_hint_opts'))),
          val: hint ? 1 : 0
        };
      }
    });
  },
  onReplySubmitChanged: function (value, from) {
    cur.wallTpl.reply_multiline = value;
    if (from) {
      var point = cur.replySubmitSettings;
      point && point.tt && point.tt.destroy();
    } else {
      ajax.post('al_wall.php', {act: 'a_save_ctrl_submit', value: value, hash: cur.wallTpl.poll_hash})
      window.Notifier && Notifier.lcSend('wall_reply_multiline', {value: value});
    }
    if (cur.editing) {
      Wall.replyFormHintUpdate(cur.editing);
    }
  },
  replyFormHintUpdate: function (post) {
    var replyHint = ge('reply_hint' + post),
        value = cur.wallTpl.reply_multiline,
        wrap = ge('submit_reply' + post),
        btn = ge('reply_button' + post),
        title = ge('reply_to_title' + post);
    if (!replyHint) return;

    var w = wrap.clientWidth - btn.clientWidth - title.clientWidth - 24;
    val(geByTag1('span', replyHint), getLang('wall_reply_submit_hint_' + (value ? 2 : 1) + (w > 300 ? '_more' : '')));
    setStyle(replyHint, 'width', w);
  },
  onReplySubmit: function (post, e) {
    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      if (cur.wallTpl.reply_multiline && (e.ctrlKey || browser.mac && e.metaKey) ||
          !cur.wallTpl.reply_multiline && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey)) {
        Wall.sendReply(post);
        return cancelEvent(e);
      }
    }
    if (e.ctrlKey && e.keyCode == KEY.RETURN) {
      var rf = ge('reply_field' + post), v = val(rf);
      if (typeof rf.selectionStart == 'number' && typeof rf.selectionEnd == 'number') {
        var start = rf.selectionStart;
        rf.value = v.slice(0, start) + "\n" + v.slice(rf.selectionEnd);
        rf.selectionStart = rf.selectionEnd = start + 1;
      } else if (document.selection && document.selection.createRange) {
        rf.focus();
        var range = document.selection.createRange();
        range.text = "\r\n";
        range.collapse(false);
        if (browser.opera) {
          range.moveEnd('character', 0);
          range.moveStart('character', 0);
        }
        range.select();
      }
      rf.autosize.update();
      setTimeout(function () {
        rf.autosize.update();
      }, 0);
      return false;
    }
  },
  sendReply: function(post) {
    var rf = ge('reply_field' + post),
        msg = val(rf),
        v = trim(msg),
        replyName, params;
    if (!v || isArray(replyName = (cur.reply_to && cur.options.reply_names[cur.reply_to[0]])) && !replyName[1].indexOf(v)) {
      elfocus('reply_field' + post);
      return;
    }
    val(rf, '');
    elfocus(rf);
    var post_hash = ge('post_hash' + post) ? ge('post_hash' + post).value : cur.options.post_hash;
    cur.wallMyReplied[post] = 1;
    cur.wallMyOpened[post] = 1;
    ajax.post('al_wall.php', params = {
      act: 'post',
      type: cur.wallType,
      reply_to: post,
      reply_to_msg: val('reply_to' + post),
      start_id: val('start_reply' + post),
      message: msg,
      from: 'widget',
      hash: post_hash
    }, {
      onDone: function(reply, replies, names) {
        cur.wallMyReplied[post] = 0;
        re('reply_link' + post);
        hide('reply_warn' + post);
        Wall._repliesLoaded(post, false, replies, names);
        cur.wallMyReplies[reply] = {
          message: msg,
          reply_to: params.reply_to,
          reply_to_msg: params.reply_to_msg,
          reply_to_user: params.reply_to_user
        };
      },
      onFail: function () {
        newEl && re(newEl);
        val(rf, msg);
      },
      showProgress: lockButton.pbind(ge('reply_button' + post)),
      hideProgress: unlockButton.pbind(ge('reply_button' + post))
    });


    var repliesEl = ge('replies' + post),
        replyId = -(++cur.wallMyRepliesCnt);
        newEl = se(rs(cur.wallTpl.reply_fast, {
          reply_id: '0_' + replyId,
          message: msg.replace(/\n/g, '<br/>'),
          date: Wall.getNowRelTime()
        }));

    if (repliesEl && !isVisible(repliesEl) || ge('reply_link' + post)) {
      re('reply_link' + post);
      show('replies_wrap' + post);
    } else {
      var openEl = repliesEl.nextSibling;
      if (openEl && openEl.className == 'replies_open') {
        Wall.openNewComments(post);
      }
      var headerEl = geByClass1('wr_header', repliesEl, 'a'),
          shown = geByClass('reply', repliesEl, 'div').length + 1,
          total = shown;
      if (headerEl) {
        total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
      }
      if (total > 5 || shown < total) {
        if (!headerEl) {
          repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
        }
        Wall.updateRepliesHeader(post, headerEl, shown, total);
      }
    }
    repliesEl.appendChild(newEl);
  },
  postTooltip: function(el, post, opts) {
    if (cur.viewAsBox) return;

    showTooltip(el, {
      url: 'al_wall.php',
      params: extend({act: 'post_tt', post: post}, opts || {}),
      slide: 15,
      shift: [35, -3, 0],
      ajaxdt: 100,
      showdt: 400,
      forcetodown: 1,
      hidedt: 200,
      className: 'rich wall_tt'
    });
  },

  hideEditPostReply: function(e) {
    if (cur.editing === false) return;
    var el = (e && e.target) ? e.target : {};
    var id = el.id;
    if (cur.editing) {
      if (!e || !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
        Wall.hideEditReply(cur.editing);
      }
    } else if (!cur.chosenMedia) {
      if (!e || id != 'post_field') {
        Wall.hideEditPost();
      }
    }
  },
  deletePost: function(post, hash) {
    cur.wallMyDeleted[post] = 1;
    var r = ge('post' + post);
    ajax.post('al_wall.php', {
      act: 'delete',
      post: post,
      hash: hash,
      from: 'widget',
      app: cur.options.app
    }, {
      onDone: function(msg, options) {
        var t = geByClass1('post_table', r) || geByClass1('reply_table', r);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = msg;
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
        }
        if (cur.section == 'posts' && cur.Rpc) {
          cur.Rpc.callMethod('publish', 'widgets.comments.delete_comment', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
          // cur.Rpc.callMethod('onChange', options.count, options.last_comment, options.date, options.full_hash, options.pageId);
        }
        hide(t);
      }
    });
    var btn = ge('delete_post' + post), myReply;
    if (btn && btn.tt && btn.tt.destroy) {
      btn.tt.destroy();
    }
    if (myReply = cur.wallMyReplies[post]) {
      val('reply_field' + myReply.reply_to, myReply.message);
      if (myReply.reply_to_msg && myReply.reply_to_user) {
        Wall.replyTo(myReply.reply_to, myReply.reply_to_msg, myReply.reply_to_user);
      } else {
        Wall.showEditReply(myReply.reply_to);
      }
      elfocus('reply_field' + myReply.reply_to);
    }
  },
  markAsSpam: function(post, hash) {
    if (!vk.id) {
      WComments.auth();
      return false;
    }
    ajax.post('al_wall.php', {
      act: 'spam',
      post: post,
      hash: hash
    }, {
      onDone: function(msg) {
        var r = ge('post' + post), t = geByClass1('post_table', r) || geByClass1('reply_table', r);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = msg;
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
        }
        hide(t);
      }
    });
    var btn = ge('delete_post' + post);
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  restorePost: function(post, hash) {
    cur.wallMyDeleted[post] = 0;
    ajax.post('al_wall.php', {
      act: 'restore',
      post: post,
      hash: hash,
      from: 'widget'
    }, {
      onDone: function(msg) {
        var pd = ge('post_del' + post);
        if (!pd) return;
        var r = ge('post' + post), t = geByClass1('post_table', r) || geByClass1('reply_table', r);
        show(t);
        hide(pd);
      }
    });
  },

  checkPostClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return false;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /wall_post_text|post_media|event_share|public_share|group_share|feed_friends|feed_gifts|feed_videos|feed_explain_list|explain|feed_photos|feedback_row/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
          inArray(target.className, ['play_new', 'page_video_inline_wrap']) ||
          (foundGood = target.className.match(classRE))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return true;
    }
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) {
      return true;
    }
    return false;
  },
  postClick: function (post, event) {
    var matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
        el = ge('post' + post);
    if (!matches) return;
    if (Wall.checkPostClick(el, event)) return;

    var moreLink = geByClass1('wall_post_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      moreLink.onclick();
      return;
    }
    if (hasClass(ge('wcomments_posts'), 'no_post_click')) return;

    window.open('wall' + matches[1] + '_' + matches[3], '_blank');
  },
  checkReplyClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return false;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /reply_dived/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
          (foundGood = hasClass(target, 'reply_table'))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return true;
    }
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) {
      return true;
    }
    return false;
  },
  replyClick: function (post, reply, event, answering) {
    var oid = intval(post),
        matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
        el = ge('post' + oid + '_' + reply);
    if (!matches) return;
    (event || {}).cancelBubble = true;
    if (Wall.checkReplyClick(el, event)) return;

    var moreLink = geByClass1('wall_reply_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      removeClass(el, 'reply_moreable');
      moreLink.onclick();
      return;
    }
    if (answering) {
      Wall.replyTo(post, reply, answering, event);
    }
  },
  postOver: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;
    if (post.match(/^(-?\d+)_(wall)?(\d+)$/)) {
      addClass(el, 'wall_post_over');
    }
    if (!vk.id) return;

    Wall.showDeletePost(post);
  },
  postOut: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;
    if (post.match(/^(-?\d+)_(wall)?(\d+)$/)) {
      removeClass(el, 'wall_post_over');
    }
    if (!vk.id) return;

    if (!el || hasClass(el, 'one')) return;
    Wall.hideDeletePost(post);
  },
  replyOver: function(post) {
    if (!vk.id) return;
    var postParts = post.split('_'),
        reply = postParts.join(postParts[0].match(/(-?\d+)(photo|video|note|topic)/) ? '_reply' : '_wall_reply'),
        lnk = ge('like_link' + reply),
        icon = ge('like_icon' + reply);

    if (!lnk) {
      Wall._animDelX(0.3, undefined, post, 'reply_delete');
      Wall._animDelX(0.3, undefined, post, 'reply_edit');
      return;
    }

    if (lnk.timeout) {
      clearTimeout(lnk.timeout);
      removeAttr(lnk, 'timeout');
    } else {
      fadeTo(lnk, 200, 1);
      Wall._animDelX(0.3, undefined, post, 'reply_delete');
      Wall._animDelX(0.3, undefined, post, 'reply_edit');
      if (hasClass(icon, 'no_likes')) {
        setStyle(icon, 'visibility', 'visible');
        animate(icon, {opacity: 0.4}, 200);
      }
    }
  },
  replyOut: function(post) {
    if (!vk.id) return;
    var postParts = post.split('_'),
        reply = postParts.join(postParts[0].match(/(-?\d+)(photo|video|note|topic)/) ?  '_reply' : '_wall_reply'),
        lnk = ge('like_link' + reply),
        icon = ge('like_icon' + reply);

    if (!lnk) {
      Wall._animDelX(0, undefined, post, 'reply_delete');
      Wall._animDelX(0, undefined, post, 'reply_edit');
      return;
    }

    lnk.timeout = setTimeout(function() {
      removeAttr(lnk, 'timeout');
      fadeTo(lnk, 200, 0);
      Wall._animDelX(0, undefined, post, 'reply_delete');
      Wall._animDelX(0, undefined, post, 'reply_edit');
      if (hasClass(icon, 'no_likes')) {
        animate(icon, {opacity: 0}, 200, function () {
          hasClass(icon, 'no_likes') && (icon.style.visibility = 'hidden');
        });
      }
    }, 1);
  },
  likeOver: function(post) {
    var icon = ge('like_icon' + post),
        link = ge('like_link' + post),
        count = ge('like_count' + post);

    if (!icon) return;
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      setTimeout(animate.pbind(icon, {opacity: 1}, 200, false), 1);
    } else {
      icon.style.visibility = 'visible';
      setStyle(icon, {opacity: 1});
    }

    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_post|)(\d+)/)
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        linkW = link.clientWidth || link.offsetWidth,
        ttW = 230,
        leftShift = ttW - (icon.parentNode.clientWidth || icon.parentNode.offsetWidth) + 4,
        pointerShift = ttW - (count.clientWidth || count.offsetWidth) - 14;

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj, from: 'wcomments'},
      slide: 15,
      shift: [leftShift, 5, 9],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      tip: {
        over: function() {
          Wall.postOver(post);
          Wall.likeOver(post);
        },
        out: function() {
          Wall.likeOut(post);
          Wall.postOut(post);
        }
      },
      className: 'rich like_tt',
      onShowStart: function (tt) {
        if (!tt.container) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: pointerShift});
        setStyle(tp, {marginLeft: pointerShift});
      }
    });
  },
  likeOut: function(post, tthide) {
    var icon = ge('like_icon' + post);
    if (!icon) return;
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      setTimeout(animate.pbind(ge('like_icon' + post), {opacity: 0.4}, 200, false), 1);
    }
    if (tthide) {
      triggerEvent(icon.parentNode, 'mouseout');
    }
  },
  postLikeOver: function(post) {
    var icon = ge('like_icon' + post),
        link = ge('like_link' + post),
        count = ge('like_count' + post);

    if (!icon || cur.viewAsBox) return;
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_post|)(\d+)/)
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        linkW = link.clientWidth || link.offsetWidth,
        ttW = 230,
        leftShift = ttW - (icon.parentNode.clientWidth || icon.parentNode.offsetWidth) + 7,
        pointerShift = ttW - (count.clientWidth || count.offsetWidth) - 14;

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj},
      slide: 15,
      shift: [leftShift, 7, 7],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      tip: {
        over: function() {
          Wall.postOver(post);
          Wall.likeOver(post);
        },
        out: function() {
          Wall.likeOut(post);
          Wall.postOut(post);
        }
      },
      className: 'rich like_tt',
      onShowStart: function (tt) {
        if (!tt.container || pointerShift === false) return;
        var bp = geByClass1('bottom_pointer', tt.container, 'div');
        var tp = geByClass1('top_pointer', tt.container, 'div');
        setStyle(bp, {marginLeft: pointerShift});
        setStyle(tp, {marginLeft: pointerShift});
      }
    });
  },
  postLikeOut: function () {

  },
  likeUpdate: function(post, my, count, title) {
    count = intval(count);

    var m = post.match(/(-?\d+)_(photo|video|note|topic|wall_reply|)(\d+)/), like_obj = (m[2] || 'wall') + m[1] + '_' + m[3];

    var countInput = ge('like_real_count_' + like_obj) || {}, rows = ge('like_table_' + like_obj);
    var titleNode = ge('like_title_' + like_obj), countNode = ge('like_count' + post);
    var icon = ge('like_icon' + post);
    var tt = countNode.parentNode.tt || {}, opts = clone(tt.opts || {}), newleft = (my ? 0 : -31);

    if (title && titleNode) {
      val(titleNode, title);
    }
    countInput.value = count;
    animateCount(countNode, count);

    if (my) {
      addClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
    } else {
      removeClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
      var cb = ge('like_share_wall' + post);
      if (cb) checkbox(cb, false);
    }
    if (count) {
      var styleName = vk.rtl ? 'right' : 'left';
      if (tt.el && !isVisible(tt.container) && !title) {
        rows.style[styleName] = newleft + 'px';
        tooltips.show(tt.el, extend(opts, {showdt: 0}));
      } else if (rows) {
        var params = {};
        params[styleName] = newleft;
        animate(rows, params, 200);
      }
      removeClass(icon, 'no_likes');
    } else {
      if (tt.el) tt.hide();
      addClass(icon, 'no_likes');
    }
  },

  like: function(post, hash) {
    if (!vk.id || cur.viewAsBox) return;
    var my = hasClass(ge('like_icon' + post), 'my_like'), matches = post.match(/(-?\d+)_(photo|video|note|topic|wall_reply|)(\d+)/), like_obj = (matches[2] || 'wall') + matches[1] + '_' + matches[3];
    ajax.post('like.php', {act: 'a_do_' + (my ? 'un' : '') + 'like', 'object': like_obj, hash: hash, wall: 1}, {
      onDone: Wall.likeUpdate.pbind(post, !my)
    });
    var countInput = ge('like_real_count_wall' + post);
    var count = countInput ? countInput.value : ge('like_count' + post).innerHTML;
    Wall.likeUpdate(post, !my, intval(count) + (my ? -1 : 1));
  },
  likeShare: function(post, hash) {
    var el = ge('like_share_wall' + post), was = isChecked(el);
    checkbox(el);
    ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: 'wall' + post, hash: hash, wall: 1}, {
      onDone: Wall.likeUpdate.pbind(post, true)
    });
    var countInput = ge('like_real_count_wall' + post);
    var count = countInput ? countInput.value : ge('like_count' + post).innerHTML;
    var my = hasClass(ge('like_icon' + post), 'my_like');
    Wall.likeUpdate(post, true, intval(count) + (my ? 0 : 1));
  },
  showLikesPage: function(post, published, offset) {
    cur.likesBox.loadTabContent('like.php', {act: 'a_get_members', object: 'wall' + post, published: published, offset: offset, wall: 1}, published);
  },
  showPhoto: function(to_id, ph, hash, el, ev) {
    return !showBox('al_photos.php', {act: 'photo_box', to_id: to_id, photo: ph, hash: hash}, {cache: 1}, el.href ? ev : false);
  },
  _animDelX: function(opacity, new_active, post, action) {
    if (post === undefined) {
      post = new_active;
      new_active = undefined;
    }
    var el = ge((action || 'delete_post') + post);
    if (!el) return;
    if (new_active !== undefined) {
      el.active = new_active;
    } else if (el.active) {
      return;
    }
    animate(el, {opacity: opacity}, 200);
  },
  update: function(count) {
    if (cur.wallType != 'all' && cur.wallType != 'own') return;
    var cnts = {}, sw = ge('page_wall_switch'), pnw = ge('page_no_wall');
    each(['all', 'own'], function() {
      var el = ge('page_wall_count_' + this);
      cnts[this + ''] = el && intval(el.value);
    });
    if (cnts.all && pnw) {
      pnw.parentNode.removeChild(pnw);
    }
    if (!cnts.own || cnts.own >= cnts.all) {
      hide(sw);
    } else {
      show(sw);
      sw.innerHTML = cur.options[cur.wallType + '_link'];
    }
    ge('page_wall_posts_count').innerHTML = cnts[cur.wallType] ? langNumeric(cnts[cur.wallType], cur.options.wall_counts) : '';
    ge('page_wall_header').href = '/wall' + cur.oid + ((cur.wallType == 'own') ? '?own=1' : '');
    var morelnk = ge('wall_more_link'), count = geByClass(cur.wallType, ge('page_wall_posts')).length;
    if (count >= cnts[cur.wallType]) {
      hide(morelnk);
    } else {
      show(morelnk);
      morelnk.onclick = Wall.showMore.pbind(count);
    }
  },

  getAbsDate: function (ts) {
    var date = new Date(ts || vkNow()),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        ampm = '', numhours;
    if (cur.wallTpl.time_system) {
      ampm = cur.wallTpl.time_system[hours > 11 ? 1 : 0];
      hours = (hours % 12) || 12;
    }
    numhours = hours > 9 ? hours : ('0' + hours);
    minutes = minutes > 9 ? minutes : ('0' + minutes);
    return cur.wallTpl.date_format.replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);
  },
  getNowRelTime: function () {
    var ts = vkNow();
    return '<span class="rel_date rel_date_needs_update" time="' + intval(ts / 1000 - (cur.tsDiff || 0)) + '" abs_time="' + Wall.getAbsDate(ts) + '">' + getLang('wall_just_now') + '</span>';
  },
  getNewPostHTML: function (ev, isAdmin, extendCb) {
    var post_id = ev[2],
        html = cur.wallTpl.post,
        repls = {
      name: ev[3].replace('mem_link', 'author'),
      online: '',
      del: (isAdmin || !ev[2].indexOf(vk.id + '_')) ? cur.wallTpl.del : cur.wallTpl.spam,
      photo: ev[4],
      link: ev[5],
      text: ev[6],
      date: ev[7],
      post_id: ev[2],
      date_postfix: '',
      post_url: post_id.replace('_wall_reply', '_')
    };
    extendCb && extend(ev, extendCb(ev));
    each (repls, function (k, v) {
      html = html.replace(new RegExp('%' + k + '%', 'g'), v);
    });
    return html;
  },
  getNewReplyHTML: function (ev, isAdmin, extendCb) {
    var acts = [],
        can_reply = ge('reply_field' + ev[2]) || ge('reply_fakebox' + ev[2]) || ge('fwr_text'),
        className = '';
        attr = '';

    if (isAdmin || !ev[2].indexOf(vk.id + '_') || !ev[4].indexOf(vk.id + '_')) {
      acts.push(cur.wallTpl.del_reply);
    } else if (ev[2].split('_')[0] != ev[4]) {
      acts.push(cur.wallTpl.spam_reply);
    }
    if (ev[8].indexOf('class="wall_reply_more"') != -1) {
      className += 'reply_moreable';
    }
    if (can_reply) {
      if (cur.onepost) {
        acts.push(cur.wallTpl.answer_reply);
      } else {
        className += ' reply_replieable';
      }
      if (!cur.options.reply_names[ev[4]]) {
        cur.options.reply_names[ev[4]] = [ev[11], ev[12]]; // name link, name greeting
      }
    }
    if (className) {
      attr = ' onclick="Wall.replyClick(\'%post_id%\', %reply_msg_id%, event, %reply_uid%)"';
    }
    if (cur.onepost) {
      acts.push('');
      acts = acts.join('<span class="divide">|</span>');
    } else {
      acts = rs(cur.wallTpl.reply_actions, {actions: acts.join('')});
    }
    var repls = {
      name: ev[5].replace('mem_link', 'author'),
      photo: psr(ev[6]),
      online: '',
      link: ev[7],
      text: psr(ev[8]),
      media: '', // not returned by now
      classname: className,
      actions: acts,
      attr: attr,
      date: Wall.getNowRelTime(),
      to_link: ev[10],
      post_id: ev[2],
      reply_id: ev[3],
      like_id: ev[3].replace('_', '_wall_reply'),
      reply_msg_id: ev[3].split('_')[1],
      reply_uid: ev[4] || 'false'
    };
    extendCb && extend(repls, extendCb(repls));
    return rs(cur.wallTpl.reply, repls);
  },
  openNewComments: function (post_raw) {
    var repliesEl = ge('replies' + post_raw),
        openEl = repliesEl.nextSibling,
        headerEl = geByClass1('wr_header', repliesEl, 'a'),
        newCnt = 0,
        shown = geByClass('reply', repliesEl, 'div').length,
        total = shown,
        newTotal = openEl.newCnt;
    each ([].slice.call(geByClass('new_reply', repliesEl, 'div')), function () {
      removeClass(this, 'new_reply');
      this.style.backgroundColor = '#FEFAE4';
      animate(this, {backgroundColor: '#FFF'}, 6000);
      newCnt++;
      if (newCnt == 100) return false;
    });
    if (headerEl) {
      total = newCnt + intval(headerEl.getAttribute('offs').split('/')[1]);
    }
    shown += - newTotal + newCnt;
    if (total > 3 || shown < total) {
      if (!headerEl) {
        repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
      }
      Wall.updateRepliesHeader(post_raw, headerEl, shown, total);
    }
    cur.wallMyOpened[post_raw] = 1;
    if (openEl && openEl.className == 'replies_open') {
      if (newTotal > 100) {
        openEl.innerHTML = getLang('news_x_new_replies_more', Math.min(100, newTotal - newCnt));
        openEl.newCnt -= newCnt;
      } else {
        re(openEl);
      }
    }
  },
  updateRepliesHeader: function (post_raw, headerEl, shown, total) {
    var headerText, href = headerEl.href, matches, showCount = 3, cls = 0;

    if (!href && (matches = post_raw.match(/^(-?\d+)_(photo|video|note|topic|video|)(\d+)$/))) {
      var type = matches[2] || 'wall';
      href = '/' + type + matches[1] + '_' + matches[3];
      switch (type) {
        case 'topic':
          href += '?offset=last&scroll=1';
          break;
        case 'wall':
          href += '?offset=last&f=replies';
          break;
      }
      headerEl.href = href;
    }
    if (total > shown) {
      if (shown < 100) {
        if (total > 100) {
          headerText = getLang('wall_show_n_of_m_last', 100);
          headerText = headerText.replace('{count}', total);
        } else {
          headerText = getLang('wall_show_all_n_replies', total);
        }
        showCount = false;
      } else {
        headerText = getLang('wall_hide_replies');
      }
    } else {
      headerText = getLang('wall_hide_replies');
      cls = 1;
    }
    toggleClass(headerEl, 'wrh_all', cls);
    headerEl.innerHTML = '<div class="wrh_text" id="wrh_text' + post_raw + '">' + headerText + '</div><div class="progress wrh_prg" id="wrh_prg' + post_raw + '"></div>';
    headerEl.onclick = Wall.showReplies.pbind(post_raw, showCount, false);
    headerEl.setAttribute('offs', shown + '/' + total);
  },
  checkRepliesLink: function (el, ev) {
    ev = ev || window.event;
    var post_raw = el.id.match(/^replies_link(-?\d+)_(photo|video|note|topic|video|)(\d+)$/),
        href = el.href;

    if (!checkEvent(ev)) {
      el.parentNode.onclick();
      return cancelEvent(ev);
    }

    if (!post_raw) {
      return;
    }
    if (!href) {
      var type = post_raw[2] || 'wall';
      href = '/' + type + post_raw[1] + '_' + post_raw[3];
      switch (type) {
        case 'topic':
          href += '?offset=last&scroll=1';
          break;
        case 'wall':
          href += '?offset=last&f=replies';
          break;
      }
      el.href = href;
    }
    if (ev.type == 'mousedown') {
      return;
    }
    if (browser.mozilla) {
      var wnd = window.open(el.href, '_blank');
      try {wnd.blur(); window.focus();} catch (e) {}
      return cancelEvent(ev);
    } else {
      ev.cancelBubble = true;
    }
  },

  init: function(opts) {
    extend(cur, {
      postField: ge('post_field'),
      sendPostBtn: ge('send_post'),
      wallType: opts.wall_type,
      withMentions: !(browser.mozilla && browser.version.match(/^2\./) || browser.mobile),
      wallTpl: opts.wall_tpl,
      wallMyDeleted: {},
      wallMyOpened: {},
      wallMyReplied: {},
      wallMyReplies: {},
      wallMyRepliesCnt: 0
    });
    if (opts.wall_tpl && opts.wall_tpl.lang) {
      cur.lang = extend(cur.lang || {}, opts.wall_tpl.lang);
    }

    Wall.update();

    if (!cur.sendPostBtn) return; // banned

    cur.sendPostBtn.onclick = Wall.sendPost;
    placeholderSetup(cur.postField);

    each(geByTag('textarea', ge('page_wall_posts')), function() { placeholderSetup(this); });

    removeEvent(document, 'click', Wall.hideEditPostReply);
    addEvent(document, 'click', Wall.hideEditPostReply);

    if (opts.media_types && ge('page_add_media')) {
      cur.wallAddMedia = initAddMedia(ge('page_add_media').firstChild, 'media_preview', opts.media_types);
      cur.wallAddMedia.onChange = function() {
        Wall.checkPostLen(ge('post_field').value, true);
      }
    }
  }
}

var wall = extend(Wall, {
  showDeletePost: Wall._animDelX.pbind(0.3),
  hideDeletePost: Wall._animDelX.pbind(0),
  activeDeletePost: function(post, tt, action) {
    Wall._animDelX(1, 1, post, action);
    if (tt) showTooltip(ge((action || 'delete_post') + post), {text: tt, showdt: 0, black: 1, shift: [14, 3, 3]});
  },
  deactiveDeletePost: Wall._animDelX.pbind(0.3, 0)
});

function initCustomMedia(lnk, types, opts) {
  lnk = ge(lnk);
  if (!lnk) return false;

  opts = opts || {};

  if (!window.__addMediaIndex) __addMediaIndex = 0;
  var menuId = ++__addMediaIndex;

  if (opts.bgsprite) {
    var icons = opts.bgsprite;
  } else if (window.devicePixelRatio >= 2) {
    var icons = '/images/icons/attach_icons_2x.png?2';
    opts.bgSize = '20px 198px';
  } else {
    var icons = '/images/icons/attach_icons.png?2';
  }
  vkImage().src = icons;

  var html = '<div class="rows"><div class="add_media_head"><nobr>' + lnk.innerHTML + '</nobr></div></div>';

  if (!window.customMenuNode) {
    window.customMenuNode = domFC(domFC(pageNode.appendChild(ce('div', {
      id: '',
      innerHTML: '<div class="scroll_fix" id="custom_menu_wrap" style="width:' + (lastInnerWidth - 1) + 'px"><div id="custom_menu_cont"></div></div>'
    }))));
  }
  var menuNode = ce('div', {
    id: 'add_media_menu_' + menuId,
    className: 'add_media_menu',
    innerHTML: '<div class="add_media_rows">' + html + '</div>'
  }, {position: 'absolute'}), rowsNode = geByClass1('rows', menuNode, 'div');
  customMenuNode.appendChild(menuNode);

  var _hideTimer, mediaMenu = {
    id: menuId,
    fixed: -1,
    menuNode: menuNode,
    updateFixed: function(newVal) {
      if (mediaMenu.fixed != -1 && newVal != -1 && newVal !== undefined && mediaMenu.fixed == newVal) {
        return;
      }
      if (mediaMenu.fixed == -1 || newVal !== undefined) {
        if (newVal === undefined || newVal == -1) {
          var el = lnk;
          mediaMenu.fixed = false;
          while (el) {
            if (getStyle(el, 'position') == 'fixed') {
              mediaMenu.fixed = true;
              break;
            }
            el = el.offsetParent;
          }
        } else {
          mediaMenu.fixed = newVal;
        }
        if (mediaMenu.fixed) {
          setStyle(customMenuNode, {position: ''});
          addClass(customMenuNode, 'fixed');
        } else {
          setStyle(customMenuNode, {position: 'absolute'});
          removeClass(customMenuNode, 'fixed');
        }
        if (isVisible(menuNode)) {
          mediaMenu._updatePosition(true);
        }
      }
    },
    show: function() {
      clearTimeout(_hideTimer);
      if (menuNode && !isVisible(menuNode)) {
        lnk.blur();
        mediaMenu.updateFixed(-1);
        var h = mediaMenu._updatePosition(), el = menuNode.firstChild;

        if (browser.msie && browser.version < 9 || browser.mobile) {
          show(menuNode);
        } else {
          setStyle(el, {height: 26, overflow: 'hidden'});
          fadeIn(menuNode, 200);
          if (mediaMenu.reverse) {
            setStyle(el, {position: 'absolute', bottom: '-25px', width: getSize(el.firstChild)[0]});
            setStyle(el.firstChild, {position: 'absolute', bottom: '0px'});
          }
          animate(el, {height: h - 2}, 200, function() {
            setStyle(el.firstChild, {position: 'relative', bottom: ''});
            setStyle(el, {height: '', overflow: '', position: 'static'});
          });
        }
        opts.onShow && opts.onShow();
      }
    },
    _updatePosition: function(visible) {
      var coords = getXY(lnk, mediaMenu.fixed);
      var top = coords[1] - 4 + (browser.msie && browser.version < 8 ? 1 : 0);
      var rowsEl = menuNode.firstChild, more = geByClass1('add_media_more', menuNode);
      if (vk.rtl) {
        var right = (lastInnerWidth - 1) - (coords[0] + getSize(lnk)[0] + 8);
        setStyle(menuNode, {right: right, top: top});
      } else {
        var left = coords[0] - 8 + (browser.msie6 ? 1 : 0);
        setStyle(menuNode, {left: left, top: top});
      }

      // Showing to up in case of little widget height
      if (!visible) {
        setStyle(menuNode, {visibility: 'hidden', display: 'block'});
        if (more) {
          hide(more);
          show(more.nextSibling);
        }
      }
      var countSize = getSize(rowsEl), st = (mediaMenu.fixed ? 0 : scrollGetY()), size = countSize;
      if (!visible) {
        if (more) {
          show(more);
          hide(more.nextSibling);
          size = getSize(rowsEl);
        }
        setStyle(menuNode, {visibility: '', display: 'none'});
      }

      var needReverse = false;
      if (countSize[1] - 25 < top - st && lastWindowHeight + st < top + countSize[1]) {
        setStyle(rowsEl, 'marginTop', -size[1] + 25);
        if (!mediaMenu.reverse) needReverse = true;
      } else {
        setStyle(rowsEl, 'marginTop', -4);//(/mac/.test(_ua) && browser.mozilla ? 22 : 20));
        if (mediaMenu.reverse) needReverse = true;
      }
      if (needReverse) {
        var els = rowsNode.childNodes, len = els.length, el = (mediaMenu.moreWrap || {}).lastChild || {};
        while (len--) {
          rowsNode.appendChild(els[len]);
        }
        els = el.childNodes; len = (els || []).length;
        while (len--) {
          el.appendChild(els[len]);
        }
        mediaMenu.reverse = !mediaMenu.reverse;
        (mediaMenu.reverse ? addClass : removeClass)(menuNode, 'add_media_rev');
      }

      return size[1];
    },
    hide: function(noTimeout) {
      clearTimeout(_hideTimer);
      var hideFunc = (browser.msie && browser.version < 9 || browser.mobile) ? hide.pbind(menuNode) : fadeOut.pbind(menuNode, 100);
      if (noTimeout === true) {
        hideFunc();
      } else {
        _hideTimer = setTimeout(hideFunc, 300);
      }
      opts.onHide && opts.onHide();
    },
    setItems: function(types) {
      for (var f = rowsNode.firstChild, l = rowsNode.lastChild; f != l; f = rowsNode.firstChild, l = rowsNode.lastChild) {
        rowsNode.removeChild(f.className == 'add_media_head' ? l : f);
      }
      var test = '';
      var spec_style = (/mac/.test(_ua) && browser.mozilla) ? {height: 19, paddingTop: 3} : {};
      var moreNode = false;

      var needHide = (types.length > 6 && getLang('global_add_media_more'));
      mediaMenu.moreWrap = false;

      each(types, function(i, v) { // [id, name, bg-position, onclick, href, bg-url, customStyle]

        var attrs = {
          innerHTML: '<nobr>' + v[1].replace(/\s/g, '&nbsp;') + '</nobr>',
          className: 'add_media_type_' + menuId + '_' + v[0] + ' add_media_item'
        }, style = v[6] || {
          backgroundImage: 'url(' + (v[5] || icons) + ')',
          backgroundPosition: (v[2] || '0 0')
        }, row;
        if (opts.bgSize) {
          style.backgroundSize = opts.bgSize;
        }

        if (needHide && i == 3) {
          var rowsEl = menuNode.firstChild;
          var moreWrap = rowsNode.appendChild(ce('div', {
            className: "add_media_more_wrap"
          }));
          addEvent(moreWrap, 'mouseover click', function() {
            clearTimeout(mediaMenu.moreHide);
            if (isVisible(moreWrap.lastChild)) return;
            show(moreWrap.lastChild);
            hide(moreWrap.firstChild);
            if (!mediaMenu.reverse) return;
            var size = getSize(rowsEl);
            setStyle(rowsEl, 'marginTop', -size[1] + 25);
          });
          addEvent(moreWrap, 'mouseout', function () {
            clearTimeout(mediaMenu.moreHide);
            mediaMenu.moreHide = setTimeout(function() {
              hide(moreWrap.lastChild);
              show(moreWrap.firstChild);
              if (!mediaMenu.reverse) return;
              var size = getSize(rowsEl);
              setStyle(rowsEl, 'marginTop', -size[1] + 25);
            }, 300);
          });
          row = moreWrap.appendChild(ce('a', {
            className: 'add_media_more add_media_item',
            innerHTML: '<nobr>'+getLang('global_add_media_more')+'</nobr>'
          }));
          moreNode = ce('div', {
            className: 'add_media_more_node',
            innerHTML: '<div class="unshown"></div>'
          }, {
            display: 'none'
          });
          row = moreWrap.appendChild(moreNode);
          mediaMenu.moreWrap = moreWrap;
        }

        extend(style, spec_style);
        if (v[4]) {
          attrs.href = v[4];
        }
        row = (moreNode ? moreNode : rowsNode).appendChild(ce('a', attrs, style));
        if (v[3]) {
          addEvent(row, 'click', function () {
            mediaMenu.hide(true);
            v[3]();
            return false;
          });
        }
      });
    }
  };

  types && mediaMenu.setItems(types);

  removeEvent(lnk, 'mouseover');
  addEvent(lnk, 'mouseover click', mediaMenu.show);
  addEvent(lnk, 'mouseout', mediaMenu.hide);
  addEvent(menuNode, 'mouseover', mediaMenu.show);
  addEvent(menuNode, 'mouseout', mediaMenu.hide);
  addEvent(menuNode, 'click', cancelEvent);
  addEvent(geByClass1('add_media_header', menuNode), 'click', function(e) {
    mediaMenu.show(true);
    cancelEvent(e);
  });

  cur.destroy.push(function() {
    cleanElems(menuNode);
    re(menuNode);
    removeEvent(lnk, 'click', mediaMenu.show);
  });

  return mediaMenu;
}

var urlActiveExp = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0])/i,
    urlInactiveExp = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0]|$)/i;

function initAddMedia(lnk, previewId, mediaTypes, opts) {
  var types = [], bgposes = {graffiti: -151, video: -19, photo: 3, audio: -41, }, addMedia;
  opts = opts || {};
  each (mediaTypes || [], function (i, v) {
    if (!v[1]) return;
    var handler = false, toId = opts.toId || cur.postTo, params = {to_id: toId, scrollbar_width: sbWidth()};
    switch (v[0]) {
      case 'graffiti':
        handler = function () {
          cur.Rpc.callMethod('showBox', 'graffiti.php?' + ajx2q({act: 'a_draw_box', to_id: cur.postTo, widget: 1, addCss: 'profile.css,swfobject.js'}), {height: 506, width: 630});
          cur.RpcMethods.graffitiUploaded = function() {
            ajax.post('graffiti.php', {act: 'a_get_last', preview: 1}, {
              onDone: function(owner, id, src) {
                addMedia.chooseMedia('graffiti', owner + '_' + id, src);
              }
            });
          }
        }
        break;

      case 'photo':
        handler = function () {
          cur.Rpc.callMethod('showBox', 'photos.php?' + ajx2q({act: 'a_choose_photo_box', to_id: cur.postTo, scrollbar_width: window.sbWidth(), preview: 1, widget: 1, addCss: 'profile.css'}), {height: 504, width: 630});
          cur.RpcMethods.doSendPhoto = function(id, owner, hash, src) {
            addMedia.chooseMedia('photo', id, src);
          }
          cur.RpcMethods.newPostedUploaded = function(id, src_full, src) {
            addMedia.chooseMedia('photo', id, src);
          }
        }
        break;

      case 'video':
        handler = function () {
          cur.Rpc.callMethod('showBox', 'video.php?' + ajx2q({act: 'a_choose_video_box', to_id: cur.postTo, scrollbar_width: window.sbWidth(), preview: 1, widget: 1, addCss: 'profile.css'}), {height: 504, width: 630});
          cur.RpcMethods.doSendVideo  = function(id, from, to, hash, src) {
            addMedia.chooseMedia('video', from + '_' + id, src);
          }
        }
        break;

      case 'audio':
        handler = function () {
          cur.Rpc.callMethod('showBox', 'audio.php?' + ajx2q({act: 'a_choose_audio_box', to_id: cur.postTo, scrollbar_width: window.sbWidth(), preview: 1, widget: 1, addCss: 'profile.css'}), {height: 511, width: 630});
          cur.RpcMethods.doSendAudio = function(id, owner, toId, hash, performer, title) {
            addMedia.chooseMedia('audio', owner + '_' + id, [performer, title]);
          }
        }
        break;

      default: topError('Unknown type: ' + v[0]);
    }
    var icon = false, bgpos = ('3px ' + bgposes[v[0]] + 'px'), url = false, name = v[1].replace(/\s/g, '&nbsp;');
    types.push([v[0], v[1], bgpos, handler, url, icon]);
  });

  var menu = initCustomMedia(lnk, types, {
    onShow: function () {
      cur.chooseMedia = addMedia.chooseMedia;
    }
  });

  if (!menu) return;
  previewId = previewId || 'media_preview';

  var lnkId = menu.id,
      limit = opts.limit || 10,
      multi = limit > 1,
      previewEl = ge(previewId),
      progressEl, picsEl, docsEl;

  addMedia = {
    _addMediaLink: lnk,
    lnkId: lnkId,
    _showAddMedia: function() {
      menu.show();
    },
    _hideAddMedia: function(noTimeout) {
      menu.hide(noTimeout);
    },
    chooseMedia: function(type, media, data) {
      if (addMedia.onChange && addMedia.onChange(type, media, data) === false) {
        return false;
      }
      addMedia.unchooseMedia();
      var preview = '';
      switch (type) {
        case 'graffiti': preview = '<img class="graffiti" src="' + data + '" />'; break;
        case 'photo'   : preview = '<img class="photo" src="' + (isArray(data) ? data[0] : data) + '" />'; break;
        case 'video'   : preview = '<img class="video" src="' + data + '" />'; break;
        case 'audio'   : preview = '<div class="audio"><div class="media_audio_icon"></div><span><b>' + data[0] + '</b> - ' + data[1] + '</span></div>'; break;
        case 'share'   :
          preview = '<div class="share"><b class="fl_l"></b>' + getLang('wall_link_label') + ': <a href="/' + data[1] + '" target="_blank">' + data[0] + '</a></div>';
          addMedia.shareData = {domain: data[0], url: data[1], initialPattern: data[2]};
          addMedia.loadPreview(data[1]);
          break;
      }
      var prevNode = ge(previewId);
      prevNode.innerHTML = '<div class="fl_l">' + preview + '</div><div class="x fl_l" onmouseover="showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onclick="cur.addMedia[' + lnkId + '].unchooseMedia()"></div>';
      show(prevNode);
      addMedia.chosenMedia = [type, media];
      boxQueue.hideLast();
      return false;
    },
    unchooseMedia: function() {
      var prevNode = ge(previewId);
      if (addMedia.chosenMedia) {
        var x = prevNode.firstChild.nextSibling;
        if (x && x.tt && x.tt.el) {
          x.tt.destroy();
        }
        addMedia.chosenMedia = false;
        hide(prevNode);
      }
      var share = addMedia.shareData;
      if (share) {
        if (share.url) {
          addMedia.urlsCancelled.push(share.url);
        }
        if (share.initialPattern) {
          addMedia.urlsCancelled.push(share.initialPattern);
        }
        addMedia.shareData = {};
      }
      var pr = [addMedia.sharePreview, addMedia.pollPreview];
      for (var i in pr) {
        if (pr[i]) {
          pr[i].parentNode.removeChild(pr[i]);
        }
      }
      addMedia.sharePreview = addMedia.pollPreview = false;
      if (addMedia.onChange) addMedia.onChange(false);
    },
    urlsCancelled: [],
    shareData: {},
    checkPostLink: function(wikiValue, noFocus) {
      //if (vk.id != cur.oid) return; // temp
      if (addMedia.chosenMedia) return;
      var rx = noFocus ? urlInactiveExp : urlActiveExp, matchesUrl;
      while (wikiValue && (matchesUrl = wikiValue.match(rx))) {
        wikiValue = wikiValue.substr(matchesUrl.index + matchesUrl[0].length);
        var url = matchesUrl[2], initialUrl = url;
        url = url.replace(/[,.;'!@#$%^&*()?:]+$/, '');
        if (!url.match(/^https?:\/\//)) url = 'http://' + url;
        if (inArray(url, addMedia.urlsCancelled) || inArray(initialUrl, addMedia.urlsCancelled)) {
          continue;
        }
        if (matchesUrl[4].match(/vkontakte\.ru|vk\.com|vkontakte\.com|vk\.cc/)) {
          var query = matchesUrl[5] || '', mediaMatches = null, mediaType = false;
          if ((mediaMatches = query.match(/#photo\/(\-?\d+)_(\d+)/)) || (mediaMatches = query.match(/photo(\-?\d+)_(\d+)/)) || (mediaMatches = query.match(/photos\.php\?oid=\-?\d+&act=show&id=(\-?\d+)_(\d+)/))) {
            mediaType = 'photo';
          } else if (mediaMatches = query.match(/video(\-?\d+)_(\d+)/)) {
            mediaType = 'video';
          } else if (mediaMatches = query.match(/audio\.php\?id=(\-?\d+)&audio_id=(\d+)/)) {
            mediaType = 'audio';
          }
          if (!mediaType) continue;
          if (addMedia.mediaInfoLoading) return;
          addMedia.mediaInfoLoading = true;
          var media = mediaMatches[1] + '_' + mediaMatches[2];
          ajax.post('share.php', {act: 'media_info', type: mediaType, media: media}, {
            onDone: function(data) {
              addMedia.chooseMedia(mediaType, media, data);
              addMedia.shareData = {initialPattern: initialUrl};
              addMedia.mediaInfoLoading = false;
            },
            onFail: function () {
              addMedia.urlsCancelled.push(url);
              addMedia.mediaInfoLoading = false;
              return true;
            }
          });
          return;
        }
        addMedia.chooseMedia('share', '', [matchesUrl[4], url, initialUrl]);
        return;
      }
    },
    loadPreview: function(url) {
      if (!url) return;
      var prevNode = ge(previewId);
      addMedia.sharePreview = prevNode.parentNode.insertBefore(ce('div', {className: 'share_preview', innerHTML: '\
<div class="content"><div></div><div class="progress"></div></div>\
<div class="bottom_pointer"></div>\
<iframe class="upload_frame" name="share_parse_iframe' + lnkId + '"></iframe>\
     '}), prevNode.parentNode.firstChild);
      var parseForm = addMedia.sharePreview.appendChild(ce('form', {action: cur.options.share.url, method: 'post', target: 'share_parse_iframe' + lnkId}));
      each({
        act: 'parse_share',
        from_host: locHost,
        mid: vk.id,
        hash: cur.options.share.hash,
        rhash: cur.options.share.rhash,
        url: url
      }, function(i, v) {
        parseForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });

      window.onParseDone = function(data) {
        var data = addMedia.shareData = extend(addMedia.shareData, data);
        if (!data.images || !data.images.length) {
          addMedia.showPreview();
          return;
        }
        var tmpImg = new Image();
        var url = '';
        data.imagesStyles = {};
        if (/^\//.test(data.images[0])) {
          url = (/^https:\/\//i.test(data.url) ? 'https://' : 'http://') + data.domain;
        } else if (!/^https?:\/\//i.test(data.images[0])) {
          url = data.url.replace(/[^\/]*$/, '');
          if (/^https?:\/\/$/i.test(url)) {
            url = data.url + '/';
          }
        }
        data.images[0] = url + data.images[0];
        tmpImg.src = data.images[0];
        var imgLoadInterval = setInterval(function() {
          if (tmpImg.width || tmpImg.height) {
            var w = tmpImg.width, h = tmpImg.height;
            if (w < 10 || h < 10) {
              data.images = [];
            } else {
              if (w > h && w > 150) {
                h = 150 * h / w;
                w = 150;
              } else if (h > 150) {
                w = 150 * w / h;
                h = 150;
              }
              data.imagesStyles[0] = 'style="width: ' + w + 'px; height: ' + h + 'px;"';
            }
            clearInterval(imgLoadInterval);
            imgLoadInterval = true;
            addMedia.showPreview();
          }
        }, 500);
        setTimeout(function() {
          if (imgLoadInterval === true) return;
          data.images = [];
          clearInterval(imgLoadInterval);
          addMedia.showPreview();
        }, 5000);
      }

      window.onParseFail = function () {
        data.failed = true;
        addMedia.showPreview();
      }

      parseForm.submit();
    },
    showPreview: function() {
      var data = addMedia.shareData, prev = addMedia.sharePreview;
      if (data.failed) {
        var html = getLang('page_not_loaded');
      } else {
        var html = (data.images && data.images[0]  ? '<img src="' + data.images[0] + '" class="fl_l" ' + data.imagesStyles[0] + ' />' : '') + (data.title ? '<h4 class="header">' + data.title + '</h4>' : '') + (data.description ? '<div class="descr">' + data.description + '</div>' : '') + '<div class="clear"></div>';
      }
      var tmpDiv = ge(previewId).appendChild(ce('div', {innerHTML: '<div class="share_preview">' + html + '</div>'}, {position: 'absolute', width: getSize(prev)[0] - 10, visibility: 'hidden'}));
      var height = getSize(tmpDiv)[1];
      tmpDiv.parentNode.removeChild(tmpDiv);

      animate(prev.firstChild, {height: height}, 200, function () {
        prev.firstChild.innerHTML = html;
      });
    },
    uploadShare: function(callback) {
      var data = addMedia.shareData, prev = addMedia.sharePreview;
      var uploadCont = prev.appendChild(ce('div', {innerHTML: '<iframe class="upload_frame" name="share_upload_iframe' + lnkId + '"></iframe>'})),
          uploadForm = uploadCont.appendChild(ce('form', {action: '/share.php', method: 'post', target: 'share_upload_iframe' + lnkId}));
      each({
        act: 'a_photo',
        url: data.url,
        index: lnkId,
        image: data.images[0],
        extra: data.extra || 0
      }, function (i, v) {
        uploadForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });
      window.onUploadDone = function(index, params) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData = extend(addMedia.shareData, {
          user_id: params.user_id,
          photo_id: params.photo_id,
          images: []
        });
        callback();
      }
      window.onUploadFail = function(index, msg) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData.images = [];
        callback();
      }
      uploadForm.submit();
    }
  }

  if (!cur.addMedia) {
    cur.addMedia = {};
  }

  cur.addMedia[lnkId] = addMedia;
  return addMedia;
}
function goAway(url) { return true; }
function gotSession (session_data) {
  location.reload();
}
function showPhoto (photo, list) {
  var h = 607, w = 607;

  cur.Rpc.callMethod('showBox', 'photos.php?' + ajx2q({act: 'a_show_photo_box', photo: photo, wall_owner: photo.split('_')[0], widget: 1, list: list, addCss: 'profile.css'}), {height: h + 112, width: w + 42});
  return false;
}

function showVideo(video, list) {
  revertLastInlineVideo();
  cur.Rpc.callMethod('showBox', 'video.php?' + ajx2q({act: 'a_show_video_box', video: video, list: list, wall_owner: video.split('_')[0], widget: 1, addCss: 'profile.css,player.js,lib/swfobject2.js'}), {height: 441, width: 502});
  return false;
}


function showCaptchaBox (sid, dif, box, o) {
    // debugLog(arguments);
  var difficulty = intval(dif) ? '' : '&s=1';
  var imgSrc = o.imgSrc || '/captcha.php?sid=' + sid + difficulty;
  cur.Rpc.callMethod('showBox', 'captcha.php?' + ajx2q({act: 'show_captcha_box', sid: sid, src: imgSrc, need_mobile: window.need_mobile_act == 1 ? 1 : 0, widget: 1, addCss: 'profile.css'}), {height: 201, width: 322});
  cur.RpcMethods.captcha = o.onSubmit;
  cur.RpcMethods.captchaHide = o.onHide;
}

try{stManager.done('api/widgets/al_comments.js');}catch(e){}


// Tiny Scrollbars start (from al_community.js)
(function(w) {
w.Scrollbar = function (obj, options) {
  this.obj = obj = ge(obj);
  this.options = options || {};

  setTimeout((function() {
    setStyle(obj, {
      overflow: 'hidden'
    });

    var size = getSize(obj);
    this.scrollHeight = size[1];

    this.scrollbar = ce('div', {
      className: 'scrollbar_cont'
    });
    setStyle(this.scrollbar, {
      marginLeft: (size[0] - 16)+'px',
      height: size[1] + 'px'
    });

    this.inner = ce('div', {
      className: 'scrollbar_inner'
    });
    this.scrollbar.appendChild(this.inner);

    this.topShadowDiv = ce('div', {
      className: 'scrollbar_top'
    });
    this.bottomShadowDiv = ce('div', {
      className: 'scrollbar_bottom',
      width: size[0]+'px'
    });
    this.bottomShadowDiv.style.width = this.topShadowDiv.style.width = size[0]+'px';
    obj.parentNode.insertBefore(this.topShadowDiv, obj);
    obj.parentNode.insertBefore(this.bottomShadowDiv, obj.nextSibling);
    obj.parentNode.insertBefore(this.scrollbar, obj);

    this.mouseMove = this._mouseMove.bind(this);
    this.mouseUp = this._mouseUp.bind(this);

    var self = this;

    function down(event) {
      if (self.moveY) return;

      addEvent(w.document, 'mousemove', self.mouseMove);
      addEvent(w.document, 'mouseup', self.mouseUp);


      self.moveY = event.screenY - (parseInt(self.inner.style.marginTop) || 0);

      w.document.body.style.cursor = 'pointer';
      addClass(self.inner, 'scrollbar_hovered');
      if (options.startDrag) {
        options.startDrag();
      }
      return cancelEvent(event);
    }


    function keydown(event) {
      var key = event.keyCode;
      switch (key) {
        case 40:  self.obj.scrollTop += 20; break;
        case 38:  self.obj.scrollTop -= 20; break;
        case 34:  self.obj.scrollTop += self.scrollHeight; break;
        case 33:  self.obj.scrollTop -= self.scrollHeight; break;
        default: return true;
      }
      self.update(true);
      return cancelEvent(event);
    }

    addEvent(obj, 'mousewheel', this.wheel.bind(this));
    addEvent(w, 'DOMMouseScroll', this.wheel.bind(this));

    if (browser.safari_mobile) {
      addEvent(obj, 'touchstart', function(event) {
        cur.touchY  = event.touches[0].pageY;
        //return cancelEvent(event);
      });
      addEvent(obj, 'touchmove', function(event) {
        var touchY = event.touches[0].pageY;
        cur.touchDiff = cur.touchY - touchY;
        obj.scrollTop += cur.touchDiff;
        cur.touchY = touchY;
        self.update(true);
        return cancelEvent(event);
      });
      addEvent(obj, 'touchend', function() {
        cur.animateInt = setInterval(function() {
          cur.touchDiff = cur.touchDiff * 0.9;
          if (cur.touchDiff < 1 && cur.touchDiff > -1) {
            clearInterval(cur.animateInt);
          } else {
            obj.scrollTop += cur.touchDiff;
            self.update(true);
          }
        }, 0);
      })
    }

    addEvent(this.inner, 'mousedown', down);
    addEvent(w, 'keydown', keydown);

    if (this.contHeight() <= this.scrollHeight) {
      hide(this.bottomShadowDiv);
    } else {
      this.bottomShadow = true;
    }
    this.inited = true;
    this.update(true);
  }).bind(this), 0);
}

w.Scrollbar.prototype._mouseMove = function(event) {
  this.obj.scrollTop = Math.floor((this.contHeight() - this.scrollHeight) * Math.min(1, (event.screenY - this.moveY) / (this.scrollHeight - 26)));
  this.update(true);
  return false;
}

w.Scrollbar.prototype._mouseUp = function(event) {
  this.moveY = false;
  removeEvent(w.document, 'mousemove', this.mouseMove);
  removeEvent(w.document, 'mouseup', this.mouseUp);
  w.document.body.style.cursor = 'default';
  removeClass(this.inner, 'scrollbar_hovered');
  if (this.options.stopDrag) {
    this.options.stopDrag();
  }
  return false;
}

w.Scrollbar.prototype.wheel = function(event) {
  if (!event) event = window.event;
  var delta = 0;
  if (event.wheelDeltaY || event.wheelDelta) {
    delta = (event.wheelDeltaY || event.wheelDelta) / 4;
  } else if (event.detail) {
    delta = -event.detail * 10
  }
  var stWas = this.obj.scrollTop;
  this.obj.scrollTop -= delta;
  if (stWas != this.obj.scrollTop && this.shown !== false) {
    this.update(true);
    return false;
  }
}

w.Scrollbar.prototype.contHeight = function() {
  if (this.contHashCash) {
    return this.contHashCash;
  }
  var nodes = this.obj.childNodes;
  var height = 0;
  var i = nodes.length;
  while (i--) {
    height += nodes[i].offsetHeight || 0;
  }
  this.contHashCash = height;
  return height;
}

w.Scrollbar.prototype.update = function(noChange, updateScroll) {
  if (!this.inited) {
    return;
  }
  if (!noChange) {
    this.contHashCash = false;
    if (this.moveY) {
      return true;
    }
  }
  if (updateScroll) {
    var size = getSize(this.obj);
    this.scrollHeight = size[1];
  }

  var height = this.contHeight();
  if (height <= this.scrollHeight) {
    hide(this.inner);
    this.shown = false;
    return;
  } else if (!this.shown) {
    show(this.inner);
    this.shown = true;
  }
  var progress = Math.min(1, this.obj.scrollTop / (height - this.scrollHeight));
  if (progress > 0 != this.topShadow) {
    (this.topShadow ? hide : show)(this.topShadowDiv);
    this.topShadow = !this.topShadow;
  }
  if (progress < 1 != this.bottomShadow) {
    (this.bottomShadow ? hide : show)(this.bottomShadowDiv);
    this.bottomShadow = !this.bottomShadow;
  }
  if (height - this.obj.scrollTop < this.scrollHeight * 2) {
    this.options.more();
  }
  // console.log(this.scrollHeight, height, progress);
  this.inner.style.marginTop = Math.floor((this.scrollHeight - 56) * progress) + 'px';
}
})(window);
// Tiny Scrollbars end



/* Inline video from common.js */
window._videoLastInlined = false;
function showInlineVideo(videoId, listId, options, ev, thumb) {
  if (checkEvent(ev)) return true;

  if (window.mvcur && mvcur.mvShown) {
    return showVideo(videoId, listId, options, ev);
  }

  options = options || {};
  options.params = options.params || {act: 'show_inline', video: videoId, list: listId, autoplay: (options.autoplay) ? 1 : 0};
  var h = thumb.clientHeight,
      w = thumb.clientWidth,
      btn = geByClass1('video_play_inline', thumb, 'div');

  extend(options.params, {width: w, height: h});
  options.onDone = function (title, html, js, opts) {
    revertLastInlineVideo();
    hide(thumb);
    var videoWrap = ce('div', {id: 'page_video_inline_wrap' + videoId, className: 'page_video_inline_wrap', innerHTML: html}, {width: w, height: h}),
        videoBg = ge('video_background' + videoId);
    _videoLastInlined = [videoWrap, thumb]
    thumb.parentNode.appendChild(videoWrap);
    videoBg && setStyle(geByTag1('img', videoBg), {width: w, height: h});
    try {
      eval('(function () {' + js + '})();');
    } catch (e) {
      debugLog('video inline error', e.message, e.stack, e, js);
    }
    var _n = window.Notifier, _a = window.audioPlayer;
    if (_n) setTimeout(function() { _n.lcSend('video_start'); }, 0);
    if (_a && _a.player && !_a.player.paused()) {
      _a.pauseTrack();
      _a.pausedByVideo = 1;
    }
  };
  options.showProgress = function () {
    addClass(btn, 'video_play_inline_loading');
  };
  options.hideProgress = function () {
    removeClass(btn, 'video_play_inline_loading');
  };
  ajax.post('al_video.php', options.params, options);
  return false;
}

function revertLastInlineVideo() {
  if (!window._videoLastInlined) {
    return;
  }
  re(_videoLastInlined[0]);
  show(_videoLastInlined[1]);
  _videoLastInlined = false;
}
