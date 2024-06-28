using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppNetCore.Server.DTOs;
using ReactAppNetCore.Server.Models;
using ReactAppNetCore.Server.Repositories;
using ReactAppNetCore.Server.Services;

namespace ReactAppNetCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly FormDBContext _context;
        private readonly IMapper _mapper;
        private readonly PasswordService _passwordService;

        public UsersController(FormDBContext context, IMapper mapper, PasswordService passwordService)
        {
            _context = context;
            _mapper = mapper;
            _passwordService = passwordService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var res = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDTO>>(res);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserDTO>(user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDTO userDTO)
        {
            if (id != userDTO.Id)
            {
                return BadRequest();
            }

            var user = _mapper.Map<User>(userDTO);
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserDTO>> PostUser(UserDTO userDTO)
        {
            var user  = _mapper.Map<User>(userDTO);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, userDTO);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            // Lấy thông tin người dùng từ cơ sở dữ liệu (giả sử có phương thức GetUserAsync để lấy)
            var user = await _context.Users.FirstOrDefaultAsync(c => c.username == loginDTO.username);

            if (user == null)
            {
                return Unauthorized("User not found");
            }

            // Xác minh mật khẩu
            if (_passwordService.VerifyPassword(user, loginDTO.password))
            {
                return Ok(_mapper.Map<UserDTO>(user));
            }
            else
            {
                return Unauthorized("Invalid password");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            // Kiểm tra xem người dùng đã tồn tại chưa
            var existingUser = await _context.Users.FirstOrDefaultAsync(c => c.username == userDTO.username);
            if (existingUser != null)
            {
                return Conflict("User already exists");
            }

            // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
            var newUser = _mapper.Map<User>(userDTO);
            newUser.password = _passwordService.HashPassword(newUser, userDTO.password);

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<UserDTO>(newUser));
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
