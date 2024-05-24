# TODO

https://aegisub.org/docs/latest/ass_tags/

## Parse tags
- [x] a
- [x] an
- [x] b
- [x] be
- [x] blur
- [x] bord
- [x] xbord
- [x] ybord
- [x] c
- [x] 1c
- [x] 2c
- [x] 3c
- [x] 4c
- [x] alpha
- [x] 1a
- [x] 2a
- [x] 3a
- [x] 4a
- [x] clip
- [x] iclip
- [x] fad
- [x] fade
- [x] fax
- [x] fay
- [x] fe
- [x] fn
- [x] fr
- [x] frx
- [x] fry
- [x] frz
- [x] fs
- [x] fscx
- [x] fscy
- [x] fsp
- [x] i
- [x] k
- [x] K
- [x] kf
- [x] ko
- [x] move(x1,y1,x2,y2)
- [x] move(x1,y1,x2,y2,t1,t2)
- [x] org
- [x] p
- [x] pbo
- [x] pos
- [x] q
- [x] r
- [x] s
- [x] shad
- [x] xshad
- [x] yshad
- [x] t(fx)
- [x] t(accel,fx)
- [x] t(t1,t2,accel,fx)
- [x] u

## Update API

old:
setT(tags, accel, t1, t2)
 
new:
setT({
    tags: [],
    accel: 0,
    t1: 0,
    t2: 0,
})

## Parse ASS File

https://github.com/FS-Frost/Asu.Utilidades/tree/master/Core/AssFile
