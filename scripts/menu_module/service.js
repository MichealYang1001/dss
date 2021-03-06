'use strict';
/*数据服务*/
window.define(['angular'], function (angular) {
    /*服务模块*/
    var services = angular.module('menu_services', []);

    /**
     * 服务
     */
    services.factory('MenuService',[
        function(){
            var data = [
                {'id':'2','name':'非洲','websites':[
                    {'name':'阿尔及利亚','url':'http://www.ons.dz/'},
                    {'name':'安哥拉','url':'http://www.ine-ao.com/'},
                    {'name':'贝宁','url':'http://www.insae-bj.org/2012/'},
                    {'name':'博茨瓦那','url':'http://www.cso.gov.bw/'},
                    {'name':'佛得角','url':'http://www.ine.cv/'},
                    {'name':'喀麦隆','url':'http://www.statistics-cameroon.org/'},
                    {'name':'中非','url':'http://www.stat-centrafrique.com/'},
                    {'name':'乍得','url':'http://www.inseed-tchad.org/'},
                    {'name':'刚果','url':'http://www.cnsee.org/'},
                    {'name':'科特迪瓦','url':'http://www.ins.ci/n/'},
                    {'name':'吉布提','url':'http://www.ministere-finances.dj/'},
                    {'name':'埃及','url':'http://www.capmas.gov.eg/'},
                    {'name':'赤道几内亚','url':'http://www.dgecnstat-ge.org/'},
                    {'name':'埃塞俄比亚','url':'http://www.csa.gov.et/'},
                    {'name':'加蓬','url':'http://www.stat-gabon.org/'},
                    {'name':'冈比亚','url':'http://www.gbos.gov.gm/'},
                    {'name':'加纳','url':'http://www.statsghana.gov.gh/'},
                    {'name':'几内亚','url':'http://www.stat-guinee.org/'},
                    {'name':'几内亚比绍','url':'http://www.stat-guinebissau.com/'},
                    {'name':'肯尼亚','url':'http://www.knbs.or.ke/'},
                    {'name':'利比里亚','url':'http://www.tlcafrica.com/lisgis/lisgis.htm'},
                    {'name':'莱索托','url':'http://www.bos.gov.ls/'},
                    {'name':'马达加斯加','url':'http://www.instat.mg/'},
                    {'name':'马拉维','url':'http://www.nsomalawi.mw/'},
                    {'name':'马里','url':'http://www.dnsi.gov.ml/'},
                    {'name':'毛里塔尼亚','url':'http://www.ons.mr/'},
                    {'name':'毛里求斯','url':'http://statsmauritius.gov.mu/'},
                    {'name':'摩洛哥','url':'http://www.hcp.ma/'},
                    {'name':'莫桑比克','url':'http://www.ine.gov.mz/en/'},
                    {'name':'纳米比亚','url':'http://www.npc.gov.na/cbs/'},
                    {'name':'尼日尔','url':'http://www.npc.gov.na/cbs/index.htm'},
                    {'name':'尼日利亚','url':'http://www.nigerianstat.gov.ng/'},
                    {'name':'卢旺达','url':'http://www.statistics.gov.rw/'},
                    {'name':'圣多美和普林西比','url':'http://www.statistics.gov.rw/'},
                    {'name':'塞内加尔','url':'http://www.ansd.sn/'},
                    {'name':'塞舌尔','url':'http://www.nsb.gov.sc/'},
                    {'name':'塞拉利昂','url':'http://www.statistics.sl/'},
                    {'name':'南非','url':'http://www.statssa.gov.za/'},
                    {'name':'南苏丹','url':'http://ssnbs.org/'},
                    {'name':'苏丹','url':'http://www.cbs.gov.sd/'},
                    {'name':'斯威士兰','url':'http://www.gov.sz/'},
                    {'name':'多哥','url':'http://www.stat-togo.org/'},
                    {'name':'突尼斯','url':'http://www.ins.nat.tn/'},
                    {'name':'乌干达','url':'http://www.ubos.org/'},
                    {'name':'坦桑尼亚','url':'http://www.nbs.go.tz/'},
                    {'name':'赞比亚','url':'http://www.zamstats.gov.zm/'},
                    {'name':'津巴布韦','url':'http://www.zimstat.co.zw/'},]},
                {'id':'2','name':'美洲','websites':[
                    {'name':'安圭拉','url':'http://www.gov.ai/statistics/'},
                    {'name':'阿根廷','url':'http://www.indec.mecon.ar/'},
                    {'name':'阿鲁巴','url':'http://www.cbs.aw/'},
                    {'name':'美国','url':'http://www.fedstats.gov/'},
                    {'name':'巴哈马群岛','url':'http://statistics.bahamas.gov.bs/'},
                    {'name':'巴巴多斯','url':'http://www.barstats.gov.bb/'},
                    {'name':'伯利兹','url':'http://www.sib.org.bz/'},
                    {'name':'百慕大','url':'http://www.seaexpress.bm/portal/server.pt'},
                    {'name':'玻利维亚','url':'http://www.ine.gob.bo/'},
                    {'name':'巴西','url':'http://www.ibge.gov.br/home/'},
                    {'name':'加拿大','url':'http://www.statcan.gc.ca/'},
                    {'name':'开曼群岛','url':'http://www.eso.ky/#3'},
                    {'name':'智利','url':'http://www.ine.cl/'},
                    {'name':'哥伦比亚','url':'http://www.dane.gov.co/'},
                    {'name':'哥斯达黎加','url':'http://www.inec.go.cr/Web/Home/pagPrincipal.aspx'},
                    {'name':'古巴','url':'http://www.one.cu/'},
                    {'name':'库拉索岛','url':'http://www.cbs.cw/'},
                    {'name':'多米尼加','url':'http://www.one.gob.do/'},
                    {'name':'厄瓜多尔','url':'http://www.inec.gob.ec/'},
                    {'name':'萨尔瓦多','url':'http://www.digestyc.gob.sv/'},
                    {'name':'危地马拉','url':'http://www.ine.gob.gt/'},
                    {'name':'圭亚那','url':'http://www.statisticsguyana.gov.gy/'},
                    {'name':'海地','url':'http://www.ihsi.ht/'},
                    {'name':'牙买加','url':'http://www.statinja.com/'},
                    {'name':'墨西哥','url':'http://www.inegi.org.mx/'},
                    {'name':'尼加拉瓜','url':'http://www.inide.gob.ni/'},
                    {'name':'巴拿马','url':'http://www.contraloria.gob.pa/inec/'},
                    {'name':'巴拉圭','url':'http://www.dgeec.gov.py/'},
                    {'name':'秘鲁','url':'http://www.inei.gob.pe/'},
                    {'name':'圣卢西亚','url':'http://204.188.173.139:9090/stats/'},
                    {'name':'圣马丁','url':'http://www.sintmaartengov.org'},
                    {'name':'苏里南','url':'http://www.statistics-suriname.org/'},
                    {'name':'特立尼达和多巴哥','url':'http://www.statistics-suriname.org/'},
                    {'name':'特克斯和凯科斯群岛','url':'http://www.depstc.org/'},
                    {'name':'乌拉圭','url':'http://www.ine.gub.uy/'},
                    {'name':'委内瑞拉','url':'http://www.ine.gov.ve/'}
                ]},
                {'id':'2','name':'亚洲','websites':[
                    {'name':'亚美尼亚','url':'http://www.armstat.am/'},
                    {'name':'阿塞拜疆','url':'http://www.azstat.org/'},
                    {'name':'巴林','url':'http://www.cio.gov.bh/'},
                    {'name':'孟加拉','url':'http://www.bbs.gov.bd/'},
                    {'name':'不丹','url':'http://www.nsb.gov.bt/'},
                    {'name':'文莱','url':'http://www.depd.gov.bn/dept_dos.html'},
                    {'name':'柬埔寨','url':'http://www.nis.gov.kh/'},
                    {'name':'塞浦路斯','url':'http://www.mof.gov.cy/mof/cystat/statistics.nsf'},
                    {'name':'格鲁吉亚','url':'http://www.geostat.ge/index.php?lang=eng'},
                    {'name':'印度','url':'http://www.mospi.gov.in/'},
                    {'name':'印度尼西亚','url':'http://www.bps.go.id/'},
                    {'name':'伊朗','url':'http://www.amar.org.ir/'},
                    {'name':'伊拉克','url':'http://cosit.gov.iq/english/index.php'},
                    {'name':'以色列','url':'http://www.cbs.gov.il/'},
                    {'name':'日本','url':'http://www.stat.go.jp/'},
                    {'name':'约旦','url':'http://www.dos.gov.jo/'},
                    {'name':'哈萨克斯坦','url':'http://www.stat.kz/'},
                    {'name':'吉尔吉斯斯坦','url':'http://www.stat.kg/'},
                    {'name':'韩国','url':'http://kostat.go.kr/'},
                    {'name':'科威特','url':'http://www.csb.gov.kw/Default_EN.aspx'},
                    {'name':'老挝','url':'http://www.nsc.gov.la/'},
                    {'name':'黎巴嫩','url':'http://www.cas.gov.lb/'},
                    {'name':'马来西亚','url':'http://www.statistics.gov.my/'},
                    {'name':'马尔代夫','url':'http://www.planning.gov.mv/'},
                    {'name':'蒙古','url':'http://www.nso.mn/'},
                    {'name':'缅甸','url':'http://www.csostat.gov.mm/'},
                    {'name':'尼泊尔','url':'http://www.cbs.gov.np/'},
                    {'name':'阿曼','url':'http://www.moneoman.gov.om/'},
                    {'name':'巴基斯坦','url':'http://www.statpak.gov.pk/depts/index.html'},
                    {'name':'菲律宾','url':'http://www.census.gov.ph/'},
                    {'name':'卡塔尔','url':'http://www.qsa.gov.qa/eng/index.htm'},
                    {'name':'沙特阿拉伯','url':'http://www.planning.gov.sa/'},
                    {'name':'新加坡','url':'http://www.singstat.gov.sg/'},
                    {'name':'斯里兰卡','url':'http://www.statistics.gov.lk/'},
                    {'name':'巴勒斯坦','url':'http://www.pcbs.gov.ps/'},
                    {'name':'叙利亚','url':'http://www.cbssyr.org/'},
                    {'name':'塔吉克斯坦','url':'http://www.stat.tj/'},
                    {'name':'泰国','url':'http://www.nso.go.th/'},
                    {'name':'东帝汶','url':'http://dne.mof.gov.tl/index.htm'},
                    {'name':'土耳其','url':'http://www.turkstat.gov.tr/'},
                    {'name':'阿联酋','url':'http://www.uaestatistics.gov.ae/EnglishHome/tabid/96/Default.aspx'},
                    {'name':'乌兹别克斯坦','url':'http://www.stat.uz/'},
                    {'name':'越南','url':'http://www.gso.gov.vn/'},
                    {'name':'也门','url':'http://www.cso-yemen.org/'}
                ]},
                {'id':'2','name':'欧洲','websites':[
                    {'name':'阿兰群岛','url':'http://www.asub.ax/'},
                    {'name':'阿尔巴尼亚','url':'http://www.instat.gov.al/'},
                    {'name':'安道尔','url':'http://www.estadistica.ad/'},
                    {'name':'奥地利','url':'http://www.statistik.at/'},
                    {'name':'白俄罗斯','url':'http://belstat.gov.by/'},
                    {'name':'比利时','url':'http://www.statbel.fgov.be/'},
                    {'name':'波黑','url':'http://www.fzs.ba/'},
                    {'name':'保加利亚','url':'http://www.nsi.bg/'},
                    {'name':'克罗地亚','url':'http://www.dzs.hr/'},
                    {'name':'捷克','url':'http://www.czso.cz/'},
                    {'name':'丹麦','url':'http://www.dst.dk/'},
                    {'name':'爱沙尼亚','url':'http://www.stat.ee/'},
                    {'name':'法罗群岛','url':'http://www.hagstova.fo/'},
                    {'name':'芬兰','url':'http://www.stat.fi/'},
                    {'name':'法国','url':'http://www.insee.fr/'},
                    {'name':'德国','url':'https://www.destatis.de/DE/Startseite.html'},
                    {'name':'希腊','url':'http://www.statistics.gr/'},
                    {'name':'格陵兰','url':'http://www.stat.gl/'},
                    {'name':'匈牙利','url':'http://www.ksh.hu/?lang=en'},
                    {'name':'冰岛','url':'http://www.hagstofa.is/'},
                    {'name':'爱尔兰','url':'http://www.cso.ie/'},
                    {'name':'意大利','url':'http://www.istat.it/'},
                    {'name':'拉脱维亚','url':'http://www.csb.lv/'},
                    {'name':'列支敦士登','url':'http://www.as.llv.li/'},
                    {'name':'立陶宛','url':'http://www.stat.gov.lt/'},
                    {'name':'卢森堡','url':'http://www.statec.lu/'},
                    {'name':'马耳他','url':'http://www.nso.gov.mt/'},
                    {'name':'摩尔多瓦','url':'http://www.statistica.md/?lang=en'},
                    {'name':'摩纳哥','url':'http://www.gouv.mc/'},
                    {'name':'黑山','url':'http://www.monstat.org/'},
                    {'name':'荷兰','url':'http://www.cbs.nl/'},
                    {'name':'挪威','url':'http://www.ssb.no/'},
                    {'name':'波兰','url':'http://www.stat.gov.pl/'},
                    {'name':'葡萄牙','url':'http://www.ine.pt/'},
                    {'name':'罗马尼亚','url':'http://www.insse.ro/'},
                    {'name':'俄罗斯','url':'http://www.gks.ru/'},
                    {'name':'圣马力诺','url':'http://www.upeceds.sm/'},
                    {'name':'塞尔维亚','url':'http://webrzs.stat.gov.rs/WebSite/'},
                    {'name':'斯洛伐克','url':'http://www.statistics.sk/'},
                    {'name':'斯洛文尼亚','url':'http://www.stat.si/'},
                    {'name':'西班牙','url':'http://www.ine.es/'},
                    {'name':'瑞典','url':'http://www.scb.se/'},
                    {'name':'瑞士','url':'http://www.bfs.admin.ch/'},
                    {'name':'马其顿','url':'http://www.stat.gov.mk/'},
                    {'name':'乌克兰','url':'http://www.ukrstat.gov.ua/'},
                    {'name':'英国','url':'http://www.statistics.gov.uk/default.asp'}
                ]},
                {'id':'2','name':'澳洲','websites':[
                    {'name':'澳大利亚','url':'http://www.abs.gov.au/'},
                    {'name':'库克群岛','url':'http://www.stats.gov.ck/'},
                    {'name':'斐济','url':'http://www.statsfiji.gov.fj/'},
                    {'name':'关岛','url':'http://www.bsp.guam.gov/'},
                    {'name':'基里巴斯','url':'http://www.spc.int/prism/Country/KI/Stats/'},
                    {'name':'密克罗尼西亚','url':'http://www.fsmgov.org/info/people.html'},
                    {'name':'马绍尔群岛','url':'http://www.spc.int/prism/country/mh/stats/'},
                    {'name':'瑙鲁','url':'http://www.spc.int/prism/country/nr/stats/'},
                    {'name':'新西兰','url':'http://www.stats.govt.nz/'},
                    {'name':'纽埃岛','url':'http://www.spc.int/prism/Country/NU/stats/'},
                    {'name':'北马里亚纳群岛','url':'http://commerce.gov.mp/divisions/central-statistics/'},
                    {'name':'帕劳群岛','url':'http://www.palaugov.net/stats/'},
                    {'name':'巴布亚新几内亚','url':'http://www.nso.gov.pg/'},
                    {'name':'萨摩亚','url':'http://www.sbs.gov.ws/'},
                    {'name':'所罗门群岛','url':'http://www.spc.int/prism/country/sb/stats/'},
                    {'name':'托克劳群岛','url':'http://www.spc.int/prism/country/tk/stats/'},
                    {'name':'汤加','url':'http://www.spc.int/prism/Country/TO/stats/'},
                    {'name':'图瓦卢','url':'http://www.spc.int/prism/country/tv/stats/'},
                    {'name':'瓦努阿图','url':'http://www.spc.int/prism/Country/VU/stats/'}
                ]},
                {'id':'0','name':'政府网站','websites':[
                    {'name':'北京','url':'http://www.beijing.gov.cn/'},
                    {'name':'天津','url':'http://www.tj.gov.cn/'},
                    {'name':'河北','url':'http://www.hebei.gov.cn/'},
                    {'name':'山西','url':'http://www.shanxigov.cn/'},
                    {'name':'内蒙古','url':'http://www.nmg.gov.cn/'},
                    {'name':'辽宁','url':'http://www.ln.gov.cn/'},
                    {'name':'吉林','url':'http://www.jl.gov.cn/'},
                    {'name':'黑龙江','url':'http://www.hlj.gov.cn/'},
                    {'name':'上海','url':'http://www.shanghai.gov.cn/'},
                    {'name':'江苏','url':'http://www.jiangsu.gov.cn/'},
                    {'name':'浙江','url':'http://www.zhejiang.gov.cn/'},
                    {'name':'安徽','url':'http://www.ah.gov.cn/'},
                    {'name':'福建','url':'http://www.fujian.gov.cn/'},
                    {'name':'江西','url':'http://www.jiangxi.gov.cn/'},
                    {'name':'山东','url':'http://www.shandong.gov.cn/'},
                    {'name':'河南','url':'http://www.henan.gov.cn/'},
                    {'name':'湖北','url':'http://www.hubei.gov.cn/'},
                    {'name':'湖南','url':'http://www.hunan.gov.cn/'},
                    {'name':'广东','url':'http://www.gd.gov.cn/'},
                    {'name':'广西','url':'http://www.gxzf.gov.cn/'},
                    {'name':'海南','url':'http://www.hainan.gov.cn/'},
                    {'name':'重庆','url':'http://www.cq.gov.cn/'},
                    {'name':'四川','url':'http://www.sc.gov.cn/'},
                    {'name':'贵州','url':'http://www.gzgov.gov.cn/'},
                    {'name':'云南','url':'http://www.yn.gov.cn/'},
                    {'name':'西藏','url':'http://www.xizang.gov.cn/index.jhtml'},
                    {'name':'陕西','url':'http://www.shaanxi.gov.cn/'},
                    {'name':'甘肃','url':'http://www.gansu.gov.cn/'},
                    {'name':'青海','url':'http://www.qh.gov.cn/'},
                    {'name':'宁夏','url':'http://www.nx.gov.cn/'},
                    {'name':'新疆','url':'http://www.xinjiang.gov.cn/'}
                ]},
                {'id':'0','name':'统计网站','websites':[
                    {'name':'北京','url':'http://www.bjstats.gov.cn/'},
                    {'name':'天津','url':'http://www.stats-tj.gov.cn/'},
                    {'name':'河北','url':'http://www.hetj.gov.cn/'},
                    {'name':'山西','url':'http://www.stats-sx.gov.cn/'},
                    {'name':'内蒙古','url':'http://www.nmgtj.gov.cn/'},
                    {'name':'辽宁','url':'http://www.ln.stats.gov.cn/'},
                    {'name':'吉林','url':'http://tjj.jl.gov.cn/'},
                    {'name':'黑龙江','url':'http://www.hlj.stats.gov.cn/'},
                    {'name':'上海','url':'http://www.stats-sh.gov.cn/'},
                    {'name':'浙江','url':'http://tjj.zj.gov.cn/'},
                    {'name':'江苏','url':'http://www.jssb.gov.cn/'},
                    {'name':'安徽','url':'http://www.ahtjj.gov.cn/tjj/web/index.jsp'},
                    {'name':'福建','url':'http://www.stats-fj.gov.cn/'},
                    {'name':'江西','url':'http://www.jxstj.gov.cn/Index.shtml'},
                    {'name':'山东','url':'http://www.stats-sd.gov.cn/'},
                    {'name':'河南','url':'http://www.ha.stats.gov.cn/hntj/index.htm'},
                    {'name':'湖北','url':'http://www.stats-hb.gov.cn/'},
                    {'name':'湖南','url':'http://www.hntj.gov.cn/'},
                    {'name':'广西','url':'http://www.gxtj.gov.cn/'},
                    {'name':'广东','url':'http://www.gdstats.gov.cn/'},
                    {'name':'重庆','url':'http://www.cqtj.gov.cn/'},
                    {'name':'海南','url':'http://www.stats.hainan.gov.cn/'},
                    {'name':'四川','url':'http://www.sc.stats.gov.cn/'},
                    {'name':'贵州','url':'http://www.gz.stats.gov.cn/'},
                    {'name':'云南','url':'http://www.stats.yn.gov.cn/TJJMH_Model/default.aspx'},
                    {'name':'甘肃','url':'http://www.gstj.gov.cn/'},
                    {'name':'陕西','url':'http://www.shaanxitj.gov.cn/'},
                    {'name':'青海','url':'http://www.qhtjj.gov.cn/'},
                    {'name':'新疆','url':'http://www.xjtj.gov.cn/'},
                    {'name':'宁夏','url':'http://www.nxtj.gov.cn/'}
                ]},
                {'id':'3','name':'联合国系统','websites':[
                    {'name':'联合国主页','url':'http://www.un.org/zh/'},
                    {'name':'联合国经济及社会理事会（经社会，ECOSOC）','url':'http://www.un.org/zh/ecosoc/'},
                    {'name':'联合国经济和社会事务部（经社部，DESA）','url':'http://www.un.org/zh/development/desa/index.html'},
                    {'name':'联合国统计司（统计司，UNSD）','url':'http://unstats.un.org/unsd/default.htm'}
                ]},
                {'id':'3','name':'联合国基金和方案','websites':[
                    {'name':'联合国贸易和发展会议（贸发会议，UNCTAD）','url':'http://unctad.org/en/Pages/Home.aspx'},
                    {'name':'世界贸易组织（世贸组织，WTO）','url':'http://www.wto.org/'},
                    {'name':'联合国开发计划署（开发署，UNDP）','url':'http://www.undp.org/content/undp/en/home.html'},
                    {'name':'联合国环境规划署（环境署，UNEP）','url':'http://www.unep.org/chinese/'},
                    {'name':'联合国人口基金（人口基金，UNFPA）','url':'http://www.unfpa.org/public/'},
                    {'name':'联合国人类居住区规划署（人居署，UN-HABITAT）','url':'http://www.unhabitat.org/categories.asp?catid=286'},
                    {'name':'联合国难民事务高级专员办事处（难民署，UNHCR）','url':'http://www.unhcr.org.hk/unhcr/sc/home.html'},
                    {'name':'联合国儿童基金（儿童基金，UNICEF）','url':'http://www.unicef.org/chinese/'},
                    {'name':'联合国禁毒和犯罪问题办公室（禁毒办，UNODC）','url':'http://www.unodc.org/'},
                    {'name':'联合国促进性别平等和增强妇女权能署（妇女署，UN-Women）','url':'http://www.un.org/zh/aboutun/structure/unwomen/'},
                    {'name':'世界粮食计划署（粮食署，WFP）','url':'http://www.wfp.org/'}
                ]},
                {'id':'3','name':'联合国区域委员会','websites':[
                    {'name':'非洲经济委员会（非洲经委会，ECA）','url':'http://www.uneca.org/'},
                    {'name':'欧洲经济委员会（欧洲经委会，ECE）','url':'http://www.unece.org/'},
                    {'name':'拉丁美洲和加勒比经济委员会（拉加经委会，ECLAC）','url':'http://www.eclac.org/default.asp?idioma=IN'},
                    {'name':'亚洲及太平洋经济社会委员会（亚太经社会，ESCAP）','url':'http://www.unescap.org/'},
                    {'name':'西亚经济社会委员会（西亚经社会，ESCWA）','url':'http://www.escwa.un.org/'}
                ]},
                {'id':'3','name':'联合国专门机构','websites':[
                    {'name':'联合国粮食及农业组织（粮农组织，FAO）','url':'http://www.fao.org/'},
                    {'name':'国际民用航空组织（国际民航组织，ICAO）','url':'http://www.icao.int/Pages/CH/default_CH.aspx'},
                    {'name':'国际农业发展基金（农发基金，IFAD）','url':'http://www.ifad.org/'},
                    {'name':'国际劳工组织（劳工组织，ILO）','url':'http://www.ilo.ch/public/english/120stat/index.htm'},
                    {'name':'国际货币基金组织（基金组织，IMF）','url':'http://www.imf.org/external/chinese/index.htm'},
                    {'name':'主要全球指标（PGI）','url':'http://www.principalglobalindicators.org/Pages/Default.aspx'},
                    {'name':'国际海事组织（海事组织，IMO）','url':'http://www.imo.org/Pages/home.aspx'},
                    {'name':'国际电信联盟（国际电联，ITU）','url':'http://www.itu.int/ti/'},
                    {'name':'联合国教育、科学及文化组织（教科文组织，UNESCO）','url':'http://unescostat.unesco.org/'},
                    {'name':'联合国工业发展组织（工发组织，UNIDO）','url':'http://www.unido.org/en/unidoorg.html'},
                    {'name':'世界旅游组织（世旅组织，UNWTO）','url':'http://www.unwto.org/statistics/index.htm'},
                    {'name':'万国邮政联盟（万国邮联，UPU）','url':'http://www.upu.int/statistics/en/index.shtml'},
                    {'name':'世界卫生组织（世卫组织，WHO）','url':'http://www.who.int/whosis/'},
                    {'name':'世界知识产权组织（知识产权组织，WIPO）','url':'http://www.wipo.int/ipstats/en/statistics/'},
                    {'name':'世界气象组织（气象组织，WMO）','url':'http://www.wmo.ch/'},
                    {'name':'国际复兴开发银行（世界银行，IBRD）','url':'http://www.worldbank.org.cn/'}
                ]},
                {'id':'3','name':'其他国际组织','websites':[
                    {'name':'上海合作组织（上合组织，SCO）','url':'http://www.sectsco.org/CN11/'},
                    {'name':'经济合作与发展组织（经合组织，OECD）','url':'http://www.oecdchina.org/'},
                    {'name':'欧洲联盟（欧盟，EU）','url':'http://europa.eu/index_en.htm'},
                    {'name':'欧洲统计局（欧洲统计局，EUROSTAT）','url':'http://epp.eurostat.ec.europa.eu/portal/page/portal/eurostat/home/'},
                    {'name':'石油输出国组织（欧佩克，OPEC）','url':'http://www.opec.org/opec_web/en/'},
                    {'name':'亚洲开发银行（亚行，ADB）','url':'http://www.adb.org/zh/main'},
                    {'name':'非洲开发银行（非行，AFDB）','url':'http://www.afdb.org/en/'},
                    {'name':'国际清算银行（清算银行，BIS）','url':'http://www.bis.org/'},
                    {'name':'欧洲中央银行（欧洲央行，ECB）','url':'http://www.ecb.europa.eu/home/html/index.en.html'}
                ]}
            ];
            return {
                'sites': function(){
                    return data;
                }
            };
        }]);
    return services;
});