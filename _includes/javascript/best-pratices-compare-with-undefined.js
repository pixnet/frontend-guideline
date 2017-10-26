// 聲明式 (Declarative), V8 引擎處理的效能較佳
if (obj !== undefined) {
    return obj.x;
}

/*
 ... ...........
 23 cmpq [r13-0x60],rax
 27 jz 72
 ... ...........
*/

// -----------------------------------------

// 晦澀難解 (Obscure)，V8 引擎轉譯較多的 bytes code，效能不彰
if (obj) {
    return obj.x;
}

/*
... ...........
 27 cmpq [r13-0x40],rax
 31 jz 128
 37 test al,0x1
 39 setzl bl
 42 movzxbl rbx,rbx
 45 cmpl rbx,0x0
 48 jnz 185
 54 cmpq [r13-0x38],rax
 58 jz 128
 64 movq rdx,[rax-0x1]
 68 testb [rdx+0xc],0x10
 72 jnz 128
 78 cmpq [r13+0x50],rdx
 82 jz 160
 160 vmovsd xmm0,[rax+0x7]
 165 movq [rbp-0x18],rbx
 169 vxorpd xmm1,xmm1,xmm1
 173 vucomisd xmm1,xmm0
 177 jz 128
 179 movq rbx,[rbp-0x18]
 183 jmp 88
 185 movq [rbp-0x18],rbx
 189 cmpq rax,0x0
 193 jz 128
 195 movq rbx,[rbp-0x18]
 199 jmp 88
... ...........
*/
