using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("Jump Settings")]
    public float jumpPower = 8f;
    public float gravityScale = 2.5f;
    public int maxAirJumps = 1;

    Rigidbody2D rb;
    SpriteRenderer sr;
    int airJumpsRemaining;
    bool grounded;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        sr = GetComponent<SpriteRenderer>();
        rb.gravityScale = gravityScale;
    }

    void Start()
    {
        airJumpsRemaining = maxAirJumps;
    }

    void Update()
    {
        HandleInput();
        UpdateGroundedCheck();
    }

    void HandleInput()
    {
        if (Input.GetMouseButtonDown(0)) // touch or left mouse
        {
            if (grounded)
            {
                Jump();
            }
            else if (airJumpsRemaining > 0)
            {
                airJumpsRemaining--;
                Jump();
            }
        }
    }

    void Jump()
    {
        rb.velocity = new Vector2(rb.velocity.x, 0f); // reset vertical speed
        rb.AddForce(Vector2.up * jumpPower, ForceMode2D.Impulse);
        // optional: play sound, particles
    }

    void UpdateGroundedCheck()
    {
        // Simple grounded check: raycast down a little from player
        float checkDist = 0.1f + (Mathf.Abs(rb.velocity.y) * Time.deltaTime);
        RaycastHit2D hit = Physics2D.Raycast(transform.position, Vector2.down, checkDist, LayerMask.GetMask("Ground"));
        bool wasGrounded = grounded;
        grounded = hit.collider != null;
        if (grounded && !wasGrounded)
        {
            airJumpsRemaining = maxAirJumps;
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Obstacle"))
        {
            GameManager.Instance.PlayerDied();
        }
    }
}
